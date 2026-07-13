# 🧩 MyZubster

**MyZubster** is a platform for managing orders and cryptocurrency payments (Monero/XMR), featuring a modern React frontend and a Node.js backend.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-1.0-blue.svg)](CODE_OF_CONDUCT.md)

---

## 🌐 Live Site

The project is fully live at:

👉 **[https://my-zubster-app.vercel.app](https://my-zubster-app.vercel.app)**

Both frontend and backend are deployed and fully functional.

---

## 📋 Features

- ✅ **JWT Authentication** (Register / Login)
- ✅ **Order Management** (Full CRUD)
- ✅ **Mock Payments** (Auto-confirm after 3 seconds)
- ✅ **Fee Calculation** (Configurable)
- ✅ **User Dashboard** (Order history and status)
- ✅ **Modern UI** (React + CSS + Toast Notifications)

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, Axios, React Toastify |
| **Backend** | Node.js, Express, JWT, Bcrypt |
| **Database** | MongoDB (Atlas Cloud) |
| **Deploy** | Vercel (Frontend) |
| **Authentication** | JWT (JSON Web Tokens) |

---

## 🚀 Local Development

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend

```bash
cd backend
npm install
node server.js
The backend will be available at http://localhost:5000
Frontend
bash

cd web-dashboard
npm install
npm start

The frontend will be available at http://localhost:3000
🌍 Project URLs
Environment	URL
Frontend (Production)	https://my-zubster-app.vercel.app
Backend (Local)	http://localhost:5000
API Health Check	http://localhost:5000/api/health
🤝 Contributing

We welcome contributions of all kinds! Please read our guidelines:

    📜 Code of Conduct – Our community standards

    📖 Contributing Guide – How to get started

Quick Start for Contributors

    Fork the repository

    Clone your fork: git clone https://github.com/YOUR-USERNAME/MyZubsterAPP.git

    Install dependencies: npm install

    Create a branch: git checkout -b feature/your-feature

    Make your changes and commit: git commit -m "feat: description"

    Push to your fork: git push origin feature/your-feature

    Open a Pull Request with a clear description

    💡 See CONTRIBUTING.md for detailed instructions, PR templates, and style guidelines.

📌 Roadmap

    Deploy Backend to Render / Cyclic.sh

    Real Monero Payment Integration

    Admin Panel for order management

    WebSocket for real-time notifications

📄 License

This project is dual-licensed under:

    MIT License – for open-source use (LICENSE-MIT.txt)

    GPL-3.0 License – for code reuse (LICENSE-GPLv3.txt)

You can choose the license that best fits your needs.
🙏 Acknowledgments

    Built with ❤️ by Danielloni-creator

    Thanks to all contributors and the open-source community

    Update: Backend and frontend are now fully functional on Vercel.

📢 We welcome contributions! Check out our Contributing Guide to get started. 🚀
