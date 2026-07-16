# 🧩 MyZubster

**MyZubster** is a complete platform for managing orders and cryptocurrency payments (Monero/XMR), featuring a modern React frontend, a secure Node.js backend, and a comprehensive admin panel.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-1.0-blue.svg)](CODE_OF_CONDUCT.md)

---

## 🌐 Live Site

👉 **[https://my-zubster-app.vercel.app](https://my-zubster-app.vercel.app)**

> **Admin Panel:** [https://my-zubster-app.vercel.app/admin](https://my-zubster-app.vercel.app/admin)

---

## 📋 Features

### 🛡️ Admin Panel
- 📊 **Dashboard statistics** – Total orders, paid, pending, revenue, users, conversion rate
- 📋 **Order management** – View, filter, search, and update order status
- 🔍 **Search & filters** – By order number, user email, or status
- 📄 **Pagination** – Navigate through orders (10 per page)
- 🔄 **Real-time updates** – WebSocket notifications for order changes

### 👤 User Features
- 🔐 **JWT Authentication** – Register/Login with refresh token rotation
- 📦 **Order Management** – Full CRUD operations
- 💳 **Payments** – Mock (auto-confirm) and Monero real payments
- 📊 **User Dashboard** – Order history with real-time status updates
- 🎨 **Modern UI** – Responsive, animations, toast notifications

### 🔒 Security
- 🛡️ **XSS Protection** – Input sanitization on all user inputs
- 🔑 **CSRF Protection** – Token-based protection for state-changing requests
- ⏱️ **Rate Limiting** – 10 attempts/15min on auth endpoints
- 🛡️ **Helmet** – HTTP security headers
- 🔗 **CORS** – Properly configured for production
- 🔄 **JWT Refresh** – With token rotation and revocation

### 💰 Monero Integration
- 🔗 **Wallet RPC** – Full integration with Monero testnet
- 🆔 **Subaddress generation** – Unique payment addresses per order
- 🔍 **Automatic payment monitoring** – 10-block confirmation (~20 min)
- 💸 **2% fee** – Automatically deducted from each payment
- 📤 **Automatic transfer** – Net amount (98%) transferred to main wallet

### 📡 WebSocket
- 🔔 **Real-time notifications** – `payment:confirmed` and `order:updated` events
- 🔄 **Automatic reconnection** – With queue management
- 🔐 **User authentication** – Secure WebSocket connections

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, Axios, React Toastify, QRCode.react, Socket.IO Client |
| **Backend** | Node.js, Express, JWT, Bcrypt, Socket.IO, Mongoose |
| **Database** | MongoDB (Atlas Cloud) |
| **Deploy** | Vercel (Frontend) / Render (Backend) / VPS (future) |
| **Payments** | Monero (XMR) Testnet / Mock |
| **Authentication** | JWT with Refresh Tokens |
| **WebSocket** | Socket.IO for real-time updates |

---

## 🚀 Local Development

### Prerequisites
- Node.js (v20+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend
```bash
npm install
node server.js
# http://localhost:5000
Frontend
bash

cd web-dashboard
npm install
npm start
# http://localhost:3000

Monero Wallet RPC (optional)
bash

# Start monerod (testnet)
./monerod --testnet --p2p-bind-port 28080 --rpc-bind-port 28081

# Start wallet RPC
./monero-wallet-rpc --testnet --wallet-file fee_wallet --password myzubster --rpc-bind-port 28083 --disable-rpc-login --daemon-port 28081

🌍 Project URLs
Environment	URL
Frontend (Production)	https://my-zubster-app.vercel.app
Admin Panel	https://my-zubster-app.vercel.app/admin
API Health Check	http://localhost:5000/api/health
Swagger Docs	http://localhost:5000/api-docs
WebSocket	ws://localhost:5000
📌 Roadmap
🟢 Completed (v1.0)

    ✅ Admin Panel (dashboard, filters, search, pagination)

    ✅ WebSocket real-time notifications

    ✅ Monero testnet integration (subaddress, monitoring, fee)

    ✅ Security (XSS, CSRF, Rate Limiting, Helmet, CORS)

    ✅ UI/UX (animations, responsive, loader)

    ✅ JWT Authentication with refresh tokens

    ✅ Order management (CRUD)

    ✅ Payment system (mock + Monero)

🟡 In Progress / Next

    ⏳ Deploy on VPS with Tor – Setup hidden service for privacy-focused access

    ⏳ Admin user management UI – View and promote users

    ⏳ Order detail modal – Popup with full order details

    ⏳ Export orders – CSV/PDF reports

    ⏳ Onion landing page – Advertising site for darknet

🔵 Future

    🔹 Mainnet Monero payments

    🔹 Mobile app (React Native)

    🔹 Analytics dashboard with charts

    🔹 Multi-language support (i18n)

    🔹 Email notifications for order status

    🔹 Telegram/Discord notifications

🧅 Tor / Onion Site Roadmap
#	Task	Status
1	Install Tor on VPS	⏳
2	Configure hidden service	⏳
3	Get onion address	⏳
4	Configure Nginx for onion	⏳
5	Create advertising landing page	⏳
6	Publish on darknet directories	⏳
🤝 Contributing

We welcome contributions of all kinds!

    📜 Code of Conduct

    📖 Contributing Guide

📄 License

This project is dual-licensed under:

    MIT License – for open-source use (LICENSE-MIT.txt)

    GPL-3.0 License – for code reuse (LICENSE-GPLv3.txt)

🙏 Acknowledgments

Built with ❤️ by Danielloni-creator

📢 We welcome contributions! Check out our Contributing Guide to get started. 🚀
text


---

## 💾 SALVA E CHIUDI

- Premi **Ctrl+S**
- Chiudi Notepad

---

## 📤 CARICA SU GITHUB

```cmd
git add README.md
git commit -m "docs: aggiornato README con roadmap completa e sintetizzata

- Tutte le funzionalità implementate (v1.0)
- Roadmap con stato attuale (completed, in progress, future)
- Sezione dedicata a Tor/Onion site roadmap
- Link e documentazione completi
"
git push origin main

✅ README COMPLETO
Sezione	Contenuto
Badge	Licenze e contributi
Live Site	URL del sito e admin panel
Features	Admin Panel, Security, Monero, WebSocket
Tech Stack	Tecnologie utilizzate
Local Development	Istruzioni per avvio locale
Project URLs	URL di produzione e locali
Roadmap	Completed, In Progress, Future
Tor/Onion	Roadmap specifica per il sito onion
Contributing	Link alle guide
License	Doppia licenza MIT/GPL-3.0

Il README è ora completo e pronto per il repository! 🚀