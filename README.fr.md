# MyZubster 🏦

**Passerelle de paiement Monero auto-hébergée**

[![Licence: MIT](https://img.shields.io/badge/Licence-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Monero](https://img.shields.io/badge/Monero-0.18.x-orange.svg)](https://www.getmonero.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)](https://www.docker.com/)

---

## 📖 Qu'est-ce que MyZubster ?

MyZubster est une **passerelle de paiement Monero auto-hébergée** conçue pour être modulaire et facilement intégrable dans n'importe quelle application.

**Fonctionnalités principales :**
- ✅ **Auto-hébergé** — aucun service tiers, contrôle total
- ✅ **Sous-adresses uniques** — chaque commande a sa propre adresse Monero
- ✅ **Taux de change en temps réel** — XMR/USD via CoinGecko API
- ✅ **Surveillance automatique** — vérifie les paiements toutes les 60 secondes
- ✅ **Authentification JWT** — accès sécurisé aux API
- ✅ **Persistance PostgreSQL** — commandes persistantes
- ✅ **Prêt pour Docker** — déploiement en une commande

---

## 🚀 Démarrage rapide avec Docker

```bash
git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git
cd MyZubsterAPP/backend
cp .env.example .env
docker-compose up -d
L'API sera disponible sur http://localhost:3000
🔧 Endpoints API
Méthode	Endpoint	Description
POST	/api/auth/login	Connexion et obtention du token JWT
POST	/api/orders	Créer une nouvelle commande
GET	/api/orders	Lister toutes les commandes
GET	/api/orders/:id	Obtenir une commande par ID
GET	/api/orders/status/:status	Commandes par statut
GET	/api/health	Health check
🔗 Projets associés

    MyZubster-Marketplace — Marketplace exemple → GitHub

    MyZubster-App — App Android → GitHub

📄 Licence

Licence MIT

Construit avec ❤️ pour la communauté Monero 🏘️
