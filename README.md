✨ Key Features
Core Features

    🧑‍💼 User Profiles — Showcase skills you offer and list what you need.

    💬 Messaging — Communicate safely with neighbors before confirming a transaction.

    📍 Location-Based Search — Find services close to you.

    ⭐ Reputation System — Two-way reviews build trust in the community.

    🛡️ Community Guidelines — A safe and respectful environment for everyone.

Advanced Features

    📅 Booking System — Schedule appointments with calendar and time slot selection.

    📝 Quotes & Estimates — Professionals can send quotes; clients can accept or reject them.

    📋 Complete Work History — Track all completed jobs with detailed information.

    🔔 Notifications — Push notifications for messages, quotes, and booking updates.

    🛠️ Admin Panel — Moderation tools for reports, users, skills, and activity logs.

    ✅ Automated Testing — Unit tests for Kotlin (Android), API tests for Node.js backend, and CI/CD with GitHub Actions.

    🌍 Internationalization — Full English UI and documentation, with support for additional languages.

    🔄 Dual Licensing — MIT and GPLv3 licenses for maximum flexibility.

    🪙 Decentralized Fee System — Smart contract-based fee management with governance.

🏗️ Tech Stack
Layer	Technology
Mobile	Kotlin, Android SDK, Retrofit, Material Design
Backend	Node.js, Express, MongoDB, JWT, bcrypt
Blockchain	Solidity, Hardhat, Web3.js, OpenZeppelin
Payments	Monero RPC, Escrow, 2% Fee Service
Fee Management	Decentralized Smart Contract (FeeManager)
Bookings	Calendar-based scheduling with time slots
Quotes	Professional-client estimate system
Notifications	Firebase FCM / UnifiedPush (optional)
AI (optional)	Groq, Gemini (for skill descriptions)
Testing	JUnit (Android), Jest (Backend), Hardhat (Contracts)
CI/CD	GitHub Actions (tests & build at every commit)
Admin Panel	React + Material-UI (optional)
Web Dashboard	React (for public interface)
📱 Installation Guide
Prerequisites

    Android Studio (latest)

    Node.js 16+

    MongoDB

    Monero wallet RPC (for testing payments)

Clone the repository
bash

git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git
cd MyZubsterAPP

Backend Setup
bash

cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, Monero RPC URL, and API keys.
npm start
# The backend will run on http://localhost:5000

Smart Contract Setup (Optional)
bash

cd backend
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat
# For local testing
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

Android App
bash

# Open the project in Android Studio
# Sync Gradle and build the APK
# Install the APK on your device (or use an emulator)

Web Dashboard (Optional)
bash

cd web-dashboard
npm install
npm start
# Runs on http://localhost:3000

Admin Panel (Optional)
bash

cd admin-panel
npm install
npm start
# Runs on http://localhost:3001

🧪 Testing
bash

# Backend tests
cd backend
npm test

# Smart contract tests
cd backend
npx hardhat test

# Android tests (in Android Studio or terminal)
./gradlew test

# All tests with GitHub Actions (automated on every push)

📅 Booking System

MyZubster includes a complete booking system:
Feature	Description
Calendar View	Select available dates for services
Time Slots	Choose from predefined time slots
Booking Status	Track status: pending, confirmed, in_progress, completed, cancelled
Automatic Scheduling	Prevent double bookings with conflict detection

Flow:

    Client selects a service and views available slots

    Client chooses a date and time

    Booking is created with status 'pending'

    Professional receives notification and can confirm

📝 Quotes & Estimates System
Feature	Description
Send Quote	Professionals can send an amount and description for a service
Accept/Reject	Clients can accept or reject quotes
Automatic Booking Update	Accepted quotes automatically confirm the booking
Quote History	Track all sent and received quotes

Flow:

    Professional sends a quote with amount and description

    Client receives notification and reviews the quote

    Client accepts or rejects the quote

    Booking status updates accordingly

📋 Work History
Feature	Description
Complete History	View all completed jobs
Infinite Scroll	Load more history as you scroll
Job Details	See service title, category, professional, amount, and date
Filtering	Filter by category and status
🛡️ Escrow System
Status	Description
Pending	Escrow request created, waiting for funding
Funded	Funds locked in escrow, work in progress
Completed	Work completed, waiting for client confirmation
Released	Funds released to the professional
Disputed	Dispute opened, waiting for resolution

Flow:

    Client accepts the quote and sends XMR

    2% fee is deducted automatically

    Funds are locked in escrow

    Professional completes the work

    Client confirms completion

    Funds are released to the professional (minus 2% fee)

🛠️ Admin Panel
Feature	Description	Role
Reports	View and manage user reports	Moderator
Users	List, filter, suspend/activate users	Admin
Skills	Approve or reject skill listings	Moderator
Stats	Dashboard with platform statistics	Moderator
Logs	Audit trail of all moderation actions	Admin
🤝 How to Contribute

We welcome contributors of all experience levels!

    Fork the repository

    Create a feature branch

    Make your changes and test them

    Submit a Pull Request with a clear description of your work

See CONTRIBUTING.md for detailed guidelines.
💰 Contributor Rewards

Contributors can earn 10% of the platform fee generated by their contributions!

    ✅ Pull requests merged

    ✅ Bug fixes

    ✅ Feature implementations

    ✅ Security improvements

How it works:

    Your PR is merged

    Your contribution is tracked

    You earn 10% of the 2% fee (0.2% of transaction value)

    Paid monthly in XMR to your wallet

🛡️ Security & Privacy

    Backend uses environment variables for sensitive data; never commit .env files

    All communication between client and server is encrypted via HTTPS

    Push notifications support Firebase FCM

    Admin Panel uses role-based access control (Admin/Moderator)

    Monero payments are non-custodial — private keys never leave the user's device

    Escrow uses Monero multisig for secure fund locking

    Smart contracts are audited and open source

If you find a security issue, please contact the maintainer privately.
📄 License

This project is licensed under either the MIT License or the GNU General Public License v3.0, at your option.

SPDX-License-Identifier: MIT OR GPL-3.0-or-later
🙏 Acknowledgments

    Monero for privacy-first digital cash

    All open-source libraries and contributors who make this project possible

    The community for feedback and support

    The Ethereum and Hardhat communities for smart contract tooling

🚀 Ready to join the community?

Explore the code, report issues, or start contributing today!

Made with ❤️ by the MyZubster community