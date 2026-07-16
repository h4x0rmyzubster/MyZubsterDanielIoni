# MyZubster 🛒🔒

**Self-hosted Monero payment integration with subaddresses**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Monero](https://img.shields.io/badge/Monero-0.18.x-orange.svg)](https://www.getmonero.org/)
[![Status](https://img.shields.io/badge/status-beta-blue.svg)]()

---

## 📖 What is MyZubster?

MyZubster is a **self-hosted Monero payment gateway** that generates unique **subaddresses** for each order. It's designed to be integrated into e-commerce platforms, SaaS apps, or any web application that wants to accept Monero (XMR) payments without relying on third-party services.

**Key features:**
- ✅ **Self-hosted** — no third-party services, full control
- ✅ **Unique subaddresses** — each order gets its own Monero address
- ✅ **Real-time exchange rate** — XMR/USD via CoinGecko API
- ✅ **Automatic payment monitoring** — checks for incoming payments every 60 seconds
- ✅ **REST API** — simple integration with any frontend
- ✅ **Open source** — MIT license

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16+)
- **Monero Wallet RPC** (monero-wallet-rpc)
- **PostgreSQL** or **MongoDB** (optional, in-memory for testing)
- **npm** or **yarn**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git
cd MyZubsterAPP/backend
2️⃣ Install dependencies
bash

npm install

3️⃣ Configure environment variables

Create a .env file from the example:
bash

cp .env.example .env

Edit .env with your settings:
env

# Server
PORT=3000
NODE_ENV=development

# Monero RPC
MONERO_RPC_URL=http://localhost:18083
MONERO_NETWORK=testnet
MONERO_WALLET_PASSWORD=your_password

# Security
JWT_SECRET=your_jwt_secret_key

4️⃣ Start the Monero Wallet RPC
bash

monero-wallet-rpc --wallet-file your_wallet --password your_password --rpc-bind-port 18083 --testnet --disable-rpc-login

5️⃣ Start the backend
bash

npm start

The server will start on http://localhost:3000
🔧 API Endpoints
Create an Order
http

POST /api/orders
Content-Type: application/json

{
  "amount": 0.01,
  "currency": "USD",
  "customerEmail": "customer@example.com"
}

Response:
json

{
  "id": 1,
  "amount": 0.01,
  "currency": "USD",
  "customerEmail": "customer@example.com",
  "moneroAddress": "B... (unique subaddress)",
  "moneroAmount": 0.00003022,
  "addressIndex": 1,
  "status": "pending",
  "createdAt": "2026-07-16T09:28:59.151Z"
}

Get All Orders
http

GET /api/orders

Get Order by ID
http

GET /api/orders/:id

Get Orders by Status
http

GET /api/orders/status/:status

Example: GET /api/orders/status/pending
Health Check
http

GET /api/health

Response:
json

{
  "status": "ok",
  "timestamp": "2026-07-16T09:30:00.000Z",
  "service": "MyZubster Backend",
  "version": "1.1.0",
  "database": "in-memory (test)",
  "monero": {
    "rpc": "http://localhost:18083",
    "network": "testnet"
  },
  "stats": {
    "totalOrders": 5,
    "pendingOrders": 3,
    "completedOrders": 2
  }
}

📊 Payment Flow

    Customer places an order → Backend generates a unique Monero subaddress

    Customer sends Monero to the subaddress

    Payment Monitor (runs every 60 seconds) checks get_transfers for incoming payments

    Status updates to completed when payment is confirmed

    Customer sees the updated status via the API

🛠️ Tech Stack
Component	Technology
Backend	Node.js + Express
Database	In-memory (PostgreSQL/MongoDB ready)
Wallet RPC	monero-wallet-rpc
Exchange Rate	CoinGecko API
Monitoring	node-cron (every 60 seconds)
Authentication	JWT (optional)
Logging	Winston
📁 Project Structure
text

backend/
├── app.js                 # Main application entry point
├── services/
│   ├── exchangeRate.js    # XMR/USD exchange rate
│   └── paymentMonitor.js  # Payment monitoring (cron job)
├── routes/                # API routes (if used)
├── models/                # Database models (if used)
└── .env.example           # Environment variables template

🧪 Testing with Testnet

    Get testnet Monero from a faucet (e.g., https://faucet.monero.town/)

    Create an order via API

    Send testnet XMR to the generated subaddress

    Wait 60 seconds for the monitor to detect the payment

    Check order status with GET /api/orders/status/completed

🤝 Contributing

Contributions are welcome! Feel free to:

    🐛 Report bugs

    💡 Suggest features

    🔧 Submit pull requests

Please read our Contributing Guidelines before submitting.
📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
🌟 Support

If you find this project useful, please give it a ⭐ on GitHub!
📬 Contact

    GitHub: DanielIoni-creator

    Project: MyZubsterAPP

Built with ❤️ for the Monero community