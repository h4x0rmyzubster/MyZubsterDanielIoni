\# MyZubster 🛒🔒



\*\*Gateway di pagamento Monero self-hosted + Marketplace di competenze open source\*\*



\[!\[Licenza: MIT](https://img.shields.io/badge/Licenza-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

\[!\[Licenza: GPLv3](https://img.shields.io/badge/Licenza-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

\[!\[Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)

\[!\[Monero](https://img.shields.io/badge/Monero-0.18.x-orange.svg)](https://www.getmonero.org/)

\[!\[Docker](https://img.shields.io/badge/Docker-ready-blue.svg)](https://www.docker.com/)

\[!\[Stato](https://img.shields.io/badge/stato-produzione-green.svg)]()



\---



\## 🎯 Cos'è MyZubster?



MyZubster è un \*\*gateway di pagamento Monero self-hosted\*\* progettato per essere modulare, estendibile e facilmente integrabile in qualsiasi applicazione.



L'architettura si compone di tre livelli:

┌─────────────────────────────────────────────────────────────────┐

│ ECOSISTEMA MYZUBSTER │

├─────────────────────────────────────────────────────────────────┤

│ │

│ ┌─────────────────────────────────────────────────────────┐ │

│ │ 🏦 MYZUBSTER CORE │ │

│ │ Gateway di pagamento Monero self-hosted │ │

│ │ - Generazione subaddress │ │

│ │ - Monitoraggio transazioni │ │

│ │ - Tasso di cambio in tempo reale │ │

│ │ - Autenticazione JWT │ │

│ │ - Persistenza PostgreSQL │ │

│ └─────────────────────────────────────────────────────────┘ │

│ ▲ │

│ │ │

│ ┌───────────────────────────┴───────────────────────────┐ │

│ │ 📱 APP DI COMPETENZE DI QUARTIERE │ │

│ │ Marketplace per competenze locali │ │

│ │ - Registrazione utenti │ │

│ │ - Pubblicazione competenze │ │

│ │ - Acquisto con Monero │ │

│ │ - Dashboard venditore │ │

│ └─────────────────────────────────────────────────────────┘ │

│ │

└─────────────────────────────────────────────────────────────────┘

text





\---



\## 📖 Progetti Open Source



\### 1️⃣ MyZubster (Core Gateway)



\*\*Repository:\*\* \[DanielIoni-creator/MyZubsterAPP](https://github.com/DanielIoni-creator/MyZubsterAPP)



Il cuore del sistema. Un gateway di pagamento Monero self-hosted che:

\- Genera \*\*subaddress univoci\*\* per ogni transazione

\- Monitora automaticamente i pagamenti (cron job ogni 60 secondi)

\- Calcola il \*\*tasso di cambio XMR/USD\*\* in tempo reale

\- Offre \*\*API REST con autenticazione JWT\*\*

\- Persiste i dati su \*\*PostgreSQL\*\*

\- È \*\*Dockerizzato\*\* per deploy facile



\*\*Usa MyZubster se:\*\*

\- Vuoi accettare pagamenti in Monero

\- Hai un e-commerce, SaaS o qualsiasi app che necessita di pagamenti

\- Vuoi un sistema self-hosted, senza terze parti



\---



\### 2️⃣ MyZubster-Marketplace (App di esempio)



\*\*Repository:\*\* \[DanielIoni-creator/MyZubster-Marketplace](https://github.com/DanielIoni-creator/MyZubster-Marketplace)



Un \*\*fork dimostrativo\*\* che mostra come integrare MyZubster in un'applicazione reale: un \*\*marketplace di competenze\*\* (ispirato a un sistema di "competenze di quartiere").



\*\*Funzionalità:\*\*

\- 👤 \*\*Utenti\*\* (registrazione, login, JWT)

\- 🛠️ \*\*Competenze\*\* (pubblicazione, ricerca, filtri)

\- 💰 \*\*Pagamenti Monero\*\* via MyZubster

\- 📦 \*\*Ordini\*\* con tracciamento stato

\- 🔍 \*\*Verifica pagamenti\*\* in tempo reale

\- 👨‍💼 \*\*Dashboard venditore\*\* (profilo, competenze, incassi)



\*\*Questo fork è ideale per:\*\*

\- Capire come integrare MyZubster in un'app

\- Usare come template per il proprio progetto

\- Contribuire allo sviluppo del marketplace



\---



\### 3️⃣ MyZubster-App (Android)



\*\*Repository:\*\* \[DanielIoni-creator/MyZubster-App](https://github.com/DanielIoni-creator/MyZubster-App)



L'app Android ufficiale per MyZubster. Realizzata con Kotlin e Jetpack Compose.



\*\*Funzionalità (in sviluppo):\*\*

\- 👤 Autenticazione utenti (JWT)

\- 🛠️ Navigazione e ricerca competenze

\- 💰 Pagamenti con Monero via MyZubster

\- 📦 Tracciamento ordini e pagamenti

\- 👨‍💼 Dashboard venditore



\---



\## 🌍 Il Progetto "Competenze di Quartiere"



Questo progetto nasce con l'obiettivo di creare un \*\*ecosistema di competenze locali\*\* dove le persone possono:



\- \*\*Offrire\*\* le proprie competenze (riparazioni, lezioni, consulenze, lavori manuali)

\- \*\*Acquistare\*\* competenze da altri membri della comunità

\- \*\*Pagare in Monero\*\* in modo privato e decentralizzato

\- \*\*Costruire\*\* una rete di fiducia e collaborazione locale



L'app "Competenze di Quartiere" è il caso d'uso principale che dimostra come la tecnologia Monero e l'architettura modulare di MyZubster possano supportare economie locali.



\---



\## 🚀 Avvio rapido



\### 1️⃣ Avvia MyZubster (gateway pagamenti)



```bash

git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git

cd MyZubsterAPP/backend

docker-compose up -d



2️⃣ Avvia il Marketplace (fork)

bash



git clone https://github.com/DanielIoni-creator/MyZubster-Marketplace.git

cd MyZubster-Marketplace

npm install

npm start



3️⃣ Configura il marketplace



Crea il file .env:

bash



cp .env.example .env



Modifica con i tuoi valori:

env



DATABASE\_URL=postgresql://postgres:password@localhost:5432/marketplace

MYZUBSTER\_API\_URL=http://localhost:3000

MYZUBSTER\_API\_TOKEN=il\_tuo\_token\_jwt



📋 Struttura del repository

text



MyZubster (Monorepo)

├── backend/                    # MyZubster Core (gateway pagamenti)

│   ├── app.js

│   ├── models/

│   ├── routes/

│   └── services/

│

├── marketplace/                # App di esempio (fork)

│   ├── server.js

│   ├── models/ (User, Skill, ServiceOrder)

│   ├── routes/ (users, skills, orders)

│   └── middleware/ (JWT auth)

│

├── web-dashboard/              # Dashboard amministrativa

├── mobile/                     # App Android (React Native)

└── docs/                       # Documentazione



🔧 Personalizzazione

Come adattare il marketplace alle tue esigenze

Modifica	Dove

Aggiungere nuove categorie di competenze	models/Skill.js

Modificare il flusso dell'ordine	routes/orders.js

Aggiungere recensioni	Crea models/Review.js e routes/reviews.js

Cambiare la valuta predefinita	.env → CURRENCY=USD

Aggiungere notifiche email	services/email.js

🤝 Contribuire



I contributi sono benvenuti! Ecco come puoi aiutare:



&#x20;   Fork il repository



&#x20;   Crea un branch per la tua feature (git checkout -b feature/nuova-funzionalita)



&#x20;   Commit le tue modifiche (git commit -m 'Aggiunta nuova funzionalità')



&#x20;   Push sul branch (git push origin feature/nuova-funzionalita)



&#x20;   Apri una Pull Request



📄 Licenze



Questo progetto utilizza un modello di doppia licenza:



&#x20;   Licenza MIT per il core gateway e il marketplace (massima libertà di integrazione)



&#x20;   GNU GPLv3 per l'app Android e il full-stack (protezione della libertà del software)



Vedi i file LICENSE-MIT e LICENSE-GPLv3 per i dettagli.

🌟 Supporto



Se trovi utile questo progetto, considera di dare una stella ⭐ su GitHub!

🌍 Traduzioni



&#x20;   English



&#x20;   Italiano



&#x20;   Español



&#x20;   Français



🔗 Link utili

Risorsa	Link

MyZubster (Core)	https://github.com/DanielIoni-creator/MyZubsterAPP

MyZubster-Marketplace	https://github.com/DanielIoni-creator/MyZubster-Marketplace

MyZubster-App	https://github.com/DanielIoni-creator/MyZubster-App

Docker Hub	https://hub.docker.com/r/myzubster/myzubster

Autore	DanielIoni-creator



Realizzato con ❤️ per la comunità Monero e per le economie locali di quartiere 🏘️

