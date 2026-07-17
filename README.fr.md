\# MyZubster 🛒🔒



\*\*Passerelle de paiement Monero auto-hébergée + Marché de compétences open source\*\*



\[!\[Licence: MIT](https://img.shields.io/badge/Licence-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

\[!\[Licence: GPLv3](https://img.shields.io/badge/Licence-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

\[!\[Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)

\[!\[Monero](https://img.shields.io/badge/Monero-0.18.x-orange.svg)](https://www.getmonero.org/)

\[!\[Docker](https://img.shields.io/badge/Docker-prêt-blue.svg)](https://www.docker.com/)

\[!\[Statut](https://img.shields.io/badge/statut-production-green.svg)]()



\---



\## 🎯 Qu'est-ce que MyZubster ?



MyZubster est une \*\*passerelle de paiement Monero auto-hébergée\*\* conçue pour être modulaire, extensible et facilement intégrable dans n'importe quelle application.



L'architecture se compose de trois couches :

┌─────────────────────────────────────────────────────────────────┐

│ ÉCOSYSTÈME MYZUBSTER │

├─────────────────────────────────────────────────────────────────┤

│ │

│ ┌─────────────────────────────────────────────────────────┐ │

│ │ 🏦 MYZUBSTER CORE │ │

│ │ Passerelle de paiement Monero auto-hébergée │ │

│ │ - Génération de sous-adresses │ │

│ │ - Surveillance des transactions │ │

│ │ - Taux de change en temps réel │ │

│ │ - Authentification JWT │ │

│ │ - Persistance PostgreSQL │ │

│ └─────────────────────────────────────────────────────────┘ │

│ ▲ │

│ │ │

│ ┌───────────────────────────┴───────────────────────────┐ │

│ │ 📱 APP DE COMPÉTENCES DE QUARTIER │ │

│ │ Marché pour compétences locales │ │

│ │ - Inscription des utilisateurs │ │

│ │ - Publication de compétences │ │

│ │ - Achat avec Monero │ │

│ │ - Tableau de bord vendeur │ │

│ └─────────────────────────────────────────────────────────┘ │

│ │

└─────────────────────────────────────────────────────────────────┘

text





\---



\## 📖 Projets Open Source



\### 1️⃣ MyZubster (Core Gateway)



\*\*Dépôt :\*\* \[DanielIoni-creator/MyZubsterAPP](https://github.com/DanielIoni-creator/MyZubsterAPP)



Le cœur du système. Une passerelle de paiement Monero auto-hébergée qui :

\- Génère des \*\*sous-adresses uniques\*\* pour chaque transaction

\- Surveille automatiquement les paiements (tâche cron toutes les 60 secondes)

\- Calcule le \*\*taux de change XMR/USD\*\* en temps réel

\- Offre une \*\*API REST avec authentification JWT\*\*

\- Persiste les données dans \*\*PostgreSQL\*\*

\- Est \*\*Dockerisée\*\* pour un déploiement facile



\*\*Utilise MyZubster si :\*\*

\- Tu veux accepter des paiements en Monero

\- Tu as un e-commerce, un SaaS ou toute application nécessitant des paiements

\- Tu veux un système auto-hébergé sans dépendances tierces



\---



\### 2️⃣ MyZubster-Marketplace (Exemple d'application)



\*\*Dépôt :\*\* \[DanielIoni-creator/MyZubster-Marketplace](https://github.com/DanielIoni-creator/MyZubster-Marketplace)



Un \*\*fork de démonstration\*\* montrant comment intégrer MyZubster dans une application réelle : un \*\*marché de compétences\*\* (inspiré d'un système de "compétences de quartier").



\*\*Fonctionnalités :\*\*

\- 👤 \*\*Utilisateurs\*\* (inscription, connexion, JWT)

\- 🛠️ \*\*Compétences\*\* (publication, recherche, filtres)

\- 💰 \*\*Paiements Monero\*\* via MyZubster

\- 📦 \*\*Commandes\*\* avec suivi d'état

\- 🔍 \*\*Vérification des paiements\*\* en temps réel

\- 👨‍💼 \*\*Tableau de bord vendeur\*\* (profil, compétences, gains)



\*\*Ce fork est idéal pour :\*\*

\- Comprendre comment intégrer MyZubster dans une application

\- Utiliser comme modèle pour ton propre projet

\- Contribuer au développement du marché



\---



\## 🌍 Le Projet "Compétences de Quartier"



Ce projet est né avec l'objectif de créer un \*\*écosystème de compétences locales\*\* où les gens peuvent :



\- \*\*Offrir\*\* leurs compétences (réparations, cours, conseil, travaux manuels)

\- \*\*Acheter\*\* des compétences d'autres membres de la communauté

\- \*\*Payer en Monero\*\* de manière privée et décentralisée

\- \*\*Construire\*\* un réseau de confiance et de collaboration locale



L'application "Compétences de Quartier" est le cas d'usage principal démontrant comment la technologie Monero et l'architecture modulaire de MyZubster peuvent soutenir les économies locales.



\---



\## 🚀 Démarrage rapide



\### 1️⃣ Démarre MyZubster (passerelle de paiement)



```bash

git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git

cd MyZubsterAPP/backend

docker-compose up -d



2️⃣ Démarre le Marketplace (fork)

bash



git clone https://github.com/DanielIoni-creator/MyZubster-Marketplace.git

cd MyZubster-Marketplace

npm install

npm start



3️⃣ Configure le marketplace



Crée un fichier .env :

bash



cp .env.example .env



Modifie avec tes valeurs :

env



DATABASE\_URL=postgresql://postgres:password@localhost:5432/marketplace

MYZUBSTER\_API\_URL=http://localhost:3000

MYZUBSTER\_API\_TOKEN=ton\_token\_jwt



📋 Structure du dépôt

text



MyZubster (Monorepo)

├── backend/                    # MyZubster Core (passerelle de paiement)

│   ├── app.js

│   ├── models/

│   ├── routes/

│   └── services/

│

├── marketplace/                # Application exemple (fork)

│   ├── server.js

│   ├── models/ (User, Skill, ServiceOrder)

│   ├── routes/ (users, skills, orders)

│   └── middleware/ (JWT auth)

│

├── web-dashboard/              # Tableau de bord d'administration

├── mobile/                     # Application Android (React Native)

└── docs/                       # Documentation



🔧 Personnalisation

Comment adapter le marché à tes besoins

Modification	Où

Ajouter de nouvelles catégories de compétences	models/Skill.js

Modifier le flux de la commande	routes/orders.js

Ajouter des avis	Créer models/Review.js et routes/reviews.js

Changer la devise par défaut	.env → CURRENCY=USD

Ajouter des notifications par email	services/email.js

🤝 Contribuer



Les contributions sont les bienvenues ! Voici comment tu peux aider :



&#x20;   Fork le dépôt



&#x20;   Crée une branche pour ta fonctionnalité (git checkout -b feature/nouvelle-fonctionnalite)



&#x20;   Commit tes modifications (git commit -m 'Ajouter nouvelle fonctionnalité')



&#x20;   Push sur la branche (git push origin feature/nouvelle-fonctionnalite)



&#x20;   Ouvre une Pull Request



📄 Licences



Ce projet utilise un modèle de double licence :



&#x20;   Licence MIT pour le cœur de la passerelle et le marché (liberté maximale d'intégration)



&#x20;   GNU GPLv3 pour l'application Android et l'application full-stack (protection de la liberté du logiciel)



Consulte les fichiers LICENSE-MIT et LICENSE-GPLv3 pour plus de détails.

🌟 Soutien



Si tu trouves ce projet utile, n'hésite pas à lui donner une étoile ⭐ sur GitHub !

🔗 Liens utiles

Ressource	Lien

MyZubster (Core)	https://github.com/DanielIoni-creator/MyZubsterAPP

MyZubster-Marketplace	https://github.com/DanielIoni-creator/MyZubster-Marketplace

Docker Hub	https://hub.docker.com/r/myzubster/myzubster

Auteur	DanielIoni-creator



Construit avec ❤️ pour la communauté Monero et les économies locales de quartier 🏘️



