# MyZubster 🏦

**Gateway di pagamento Monero self-hosted**

[![Licenza: MIT](https://img.shields.io/badge/Licenza-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Monero](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://www.getmonero.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)](https://www.docker.com/)

---

## 📖 Cos'è MyZubster?

MyZubster è un **gateway di pagamento Monero self-hosted** progettato per essere modulare e facilmente integrabile in qualsiasi applicazione.

**Caratteristiche principali:**
- ✅ **Self-hosted** — nessun servizio di terze parti, pieno controllo
- ✅ **Subaddress unici** — ogni ordine ha il suo indirizzo Monero
- ✅ **Tasso di cambio in tempo reale** — XMR/USD via CoinGecko API
- ✅ **Monitoraggio automatico pagamenti** — controlla ogni 60 secondi
- ✅ **Autenticazione JWT** — accesso sicuro alle API
- ✅ **Persistenza PostgreSQL** — gli ordini sopravvivono ai riavvii
- ✅ **Pronto per Docker** — deploy con un comando

---

## 🚀 Avvio rapido con Docker

```bash
git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git
cd MyZubsterAPP/backend
cp .env.example .env
docker-compose up -d
L'API sarà disponibile su http://localhost:3000
🔧 Endpoint API
Metodo	Endpoint	Descrizione
POST	/api/auth/login	Login e ottieni token JWT
POST	/api/orders	Crea un nuovo ordine
GET	/api/orders	Elenca tutti gli ordini
GET	/api/orders/:id	Ottieni ordine per ID
GET	/api/orders/status/:status	Ordini per stato
GET	/api/health	Health check
🔗 Progetti correlati

    MyZubster-Marketplace — Marketplace di esempio → GitHub

    MyZubster-App — App Android → GitHub

📄 Licenza

Licenza MIT

Realizzato con ❤️ per la comunità Monero 🏘️