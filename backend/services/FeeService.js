// services/FeeService.js
// Servizio per la gestione decentralizzata delle fee su blockchain

const { Web3 } = require('web3');  // <-- NOTA: import con destrutturazione
const path = require('path');
const fs = require('fs');

// Carica l'ABI del contratto FeeManager
let feeManagerABI;
try {
    const abiPath = path.join(__dirname, '../abis/FeeManager.json');
    const abiFile = fs.readFileSync(abiPath, 'utf8');
    feeManagerABI = JSON.parse(abiFile);
} catch (error) {
    console.warn('⚠️ Impossibile caricare FeeManager ABI, uso ABI minimale');
    // ABI minimale per i metodi essenziali
    feeManagerABI = {
        abi: [
            {
                "inputs": [],
                "name": "getCurrentFee",
                "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "governanceToken",
                "outputs": [{"internalType": "address", "name": "", "type": "address"}],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    };
}

class FeeService {
    constructor() {
        // Configura il provider Web3
        const providerUrl = process.env.WEB3_PROVIDER || 'http://localhost:8545';
        
        // Per Web3 v4+, usa il costruttore con l'oggetto provider
        this.web3 = new Web3(providerUrl);
        
        // Indirizzo del contratto FeeManager
        this.contractAddress = process.env.FEE_CONTRACT_ADDRESS || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
        
        // Inizializza il contratto
        this.contract = new this.web3.eth.Contract(
            feeManagerABI.abi,
            this.contractAddress
        );
        
        // Valori di default
        this.baseFee = 200; // 2.00% (in centesimi)
        this.variableRate = 50; // 0.50%
        this.discountThreshold = 1000; // 10.00€
        this.discountRate = 100; // 1.00%
        this.isInitialized = false;
    }

    // ==========================================
    // METODI PER INTERAGIRE CON IL CONTRATTO
    // ==========================================

    // Ottiene la configurazione corrente delle fee
    async getCurrentFeeConfig() {
        try {
            console.log('📊 Recupero config fee dal contratto...');
            
            // Prova a ottenere la fee corrente
            let currentFee = 2;
            let governanceToken = '0x0000000000000000000000000000000000000000';
            
            try {
                // Usa getCurrentFee() se disponibile
                if (this.contract.methods.getCurrentFee) {
                    const fee = await this.contract.methods.getCurrentFee().call();
                    currentFee = Number(fee) / 100; // Se il contratto usa centesimi
                    console.log(`✅ Fee corrente dal contratto: ${currentFee}%`);
                }
            } catch (error) {
                console.log('⚠️ getCurrentFee() non disponibile, uso default');
            }
            
            try {
                // Ottieni il governance token
                if (this.contract.methods.governanceToken) {
                    governanceToken = await this.contract.methods.governanceToken().call();
                    console.log(`✅ Governance token: ${governanceToken}`);
                }
            } catch (error) {
                console.log('⚠️ governanceToken() non disponibile');
            }
            
            this.isInitialized = true;
            
            return {
                baseFee: Math.round(currentFee * 100), // 200 = 2.00%
                variableRate: 50, // 0.50%
                discountThreshold: 1000, // 10.00€
                discountRate: 100, // 1.00%
                governanceToken,
                contractAddress: this.contractAddress
            };
            
        } catch (error) {
            console.warn('⚠️ Errore getCurrentFeeConfig:', error.message);
            console.warn('⚠️ Usando configurazione di default');
            
            // Configurazione di default
            return {
                baseFee: 200,
                variableRate: 50,
                discountThreshold: 1000,
                discountRate: 100,
                governanceToken: '0x0000000000000000000000000000000000000000',
                contractAddress: this.contractAddress
            };
        }
    }

    // ==========================================
    // CALCOLO FEE CON MODELLO AFFINE
    // ==========================================

    /**
     * Calcola la fee utilizzando il modello affine:
     * fee = baseFee + variableRate * sqrt(volume)
     * 
     * @param {number} amount - Importo della transazione in centesimi
     * @param {number} userVolume - Volume totale dell'utente in centesimi
     * @returns {Object} - Info sulla fee calcolata
     */
    async calculateAffineFee(amount, userVolume = 0) {
        try {
            // Ottieni la configurazione corrente
            const config = await this.getCurrentFeeConfig();
            
            // Calcola la fee base
            const baseFeeAmount = (amount * config.baseFee) / 10000;
            
            // Calcola la fee variabile basata sul volume
            const volumeFactor = Math.sqrt(Math.max(0, userVolume));
            const variableFeeAmount = (amount * config.variableRate * volumeFactor) / 10000;
            
            // Fee totale
            const totalFee = baseFeeAmount + variableFeeAmount;
            
            // Applica sconto se il volume supera la soglia
            let discount = 0;
            if (userVolume > config.discountThreshold) {
                discount = (totalFee * config.discountRate) / 100;
            }
            
            const finalFee = Math.max(0, totalFee - discount);
            
            return {
                amount: amount / 100, // In euro
                userVolume: userVolume / 100, // In euro
                baseFee: baseFeeAmount / 100,
                variableFee: variableFeeAmount / 100,
                totalFee: finalFee / 100,
                discount: discount / 100,
                feePercentage: (finalFee / amount) * 100,
                config
            };
            
        } catch (error) {
            console.error('❌ Errore calculateAffineFee:', error);
            // Fallback: fee semplice del 2%
            const fee = amount * 0.02;
            return {
                amount: amount / 100,
                userVolume: userVolume / 100,
                baseFee: fee / 100,
                variableFee: 0,
                totalFee: fee / 100,
                discount: 0,
                feePercentage: 2,
                config: await this.getCurrentFeeConfig()
            };
        }
    }

    // ==========================================
    // DISTRIBUZIONE DELLE FEE
    // ==========================================

    /**
     * Calcola la distribuzione della fee tra i vari stakeholder
     * 
     * @param {number} totalFee - Fee totale in centesimi
     * @returns {Object} - Distribuzione della fee
     */
    async calculateDistribution(totalFee) {
        // Percentuali di distribuzione
        const distribution = {
            community: 0.40,    // 40% - Fondo comunitario
            developers: 0.25,   // 25% - Sviluppatori
            governance: 0.20,   // 20% - Governance
            treasury: 0.15      // 15% - Tesoreria
        };
        
        const feeInCents = totalFee * 100;
        
        return {
            community: (feeInCents * distribution.community) / 100,
            developers: (feeInCents * distribution.developers) / 100,
            governance: (feeInCents * distribution.governance) / 100,
            treasury: (feeInCents * distribution.treasury) / 100,
            total: feeInCents,
            percentages: distribution
        };
    }

    // ==========================================
    // MONITORAGGIO FEE
    // ==========================================

    async monitorFeeChanges() {
        console.log('👁️ Avvio monitoraggio fee...');
        
        // Monitora gli eventi del contratto se disponibili
        try {
            // Cerca eventi nel contratto
            const events = this.contract.events;
            if (events && events.FeeUpdated) {
                events.FeeUpdated({ fromBlock: 'latest' }, (error, event) => {
                    if (error) {
                        console.error('Errore evento FeeUpdated:', error);
                    } else {
                        console.log('📊 Fee aggiornata:', event.returnValues);
                    }
                });
                console.log('✅ Monitoraggio eventi FeeUpdated attivo');
            }
        } catch (error) {
            console.log('⚠️ Monitoraggio eventi non disponibile');
        }
        
        return true;
    }

    // ==========================================
    // CREAZIONE PROPOSTE DI GOVERNANCE
    // ==========================================

    async createProposal(description, amount) {
        try {
            if (!this.contract.methods.createProposal) {
                throw new Error('createProposal() non disponibile nel contratto');
            }
            
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.contract.methods.createProposal(description, amount)
                .send({ from: accounts[0] });
            
            console.log('✅ Proposta creata:', result);
            return result;
            
        } catch (error) {
            console.error('❌ Errore createProposal:', error);
            return null;
        }
    }
}

// ==========================================
// ESPORTA UN'ISTANZA SINGLETON
// ==========================================

const feeService = new FeeService();

module.exports = feeService;