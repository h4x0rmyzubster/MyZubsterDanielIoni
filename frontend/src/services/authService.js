import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Crea un'istanza axios con configurazioni di default
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        console.log('✅ Registrazione riuscita:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Errore registrazione:', error);
        if (error.response) {
            console.error('📋 Dettagli errore:', error.response.data);
        }
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        console.log('🔐 Invio richiesta login:', credentials);
        const response = await api.post('/auth/login', credentials);
        console.log('📦 Risposta ricevuta (status):', response.status);
        console.log('📦 Dati risposta:', response.data);
        
        // Se il backend risponde con success: true, restituisci i dati
        if (response.data && response.data.success === true) {
            return response.data;
        } else {
            // Se la risposta non ha il formato atteso, lancia un errore
            throw new Error('Formato risposta non valido');
        }
    } catch (error) {
        console.error('❌ Errore login:', error);
        if (error.response) {
            console.error('📋 Status:', error.response.status);
            console.error('📋 Dati errore:', error.response.data);
        } else if (error.request) {
            console.error('📋 Nessuna risposta dal server');
        }
        throw error;
    }
};