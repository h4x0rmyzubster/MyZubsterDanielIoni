\# MyZubster 🛒🔒



\*\*Pasarela de pago Monero autoalojada + Mercado de habilidades open source\*\*



\[!\[Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

\[!\[Licencia: GPLv3](https://img.shields.io/badge/Licencia-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

\[!\[Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)

\[!\[Monero](https://img.shields.io/badge/Monero-0.18.x-orange.svg)](https://www.getmonero.org/)

\[!\[Docker](https://img.shields.io/badge/Docker-listo-blue.svg)](https://www.docker.com/)

\[!\[Estado](https://img.shields.io/badge/estado-producción-green.svg)]()



\---



\## 🎯 ¿Qué es MyZubster?



MyZubster es una \*\*pasarela de pago Monero autoalojada\*\* diseñada para ser modular, extensible y fácilmente integrable en cualquier aplicación.



La arquitectura consta de tres capas:

┌─────────────────────────────────────────────────────────────────┐

│ ECOSISTEMA MYZUBSTER │

├─────────────────────────────────────────────────────────────────┤

│ │

│ ┌─────────────────────────────────────────────────────────┐ │

│ │ 🏦 MYZUBSTER CORE │ │

│ │ Pasarela de pago Monero autoalojada │ │

│ │ - Generación de subdirecciones │ │

│ │ - Monitoreo de transacciones │ │

│ │ - Tasas de cambio en tiempo real │ │

│ │ - Autenticación JWT │ │

│ │ - Persistencia PostgreSQL │ │

│ └─────────────────────────────────────────────────────────┘ │

│ ▲ │

│ │ │

│ ┌───────────────────────────┴───────────────────────────┐ │

│ │ 📱 APP DE COMPETENCIAS DE BARRIO │ │

│ │ Mercado para habilidades locales │ │

│ │ - Registro de usuarios │ │

│ │ - Publicación de habilidades │ │

│ │ - Compra con Monero │ │

│ │ - Panel de vendedor │ │

│ └─────────────────────────────────────────────────────────┘ │

│ │

└─────────────────────────────────────────────────────────────────┘



\---



\## 📖 Proyectos Open Source



\### 1️⃣ MyZubster (Core Gateway)



\*\*Repositorio:\*\* \[DanielIoni-creator/MyZubsterAPP](https://github.com/DanielIoni-creator/MyZubsterAPP)



El corazón del sistema. Una pasarela de pago Monero autoalojada que:

\- Genera \*\*subdirecciones únicas\*\* para cada transacción

\- Monitorea automáticamente los pagos (cron job cada 60 segundos)

\- Calcula la \*\*tasa de cambio XMR/USD\*\* en tiempo real

\- Ofrece \*\*API REST con autenticación JWT\*\*

\- Persiste datos en \*\*PostgreSQL\*\*

\- Está \*\*Dockerizado\*\* para despliegue fácil



\*\*Usa MyZubster si:\*\*

\- Quieres aceptar pagos en Monero

\- Tienes un e-commerce, SaaS o cualquier app que necesite pagos

\- Quieres un sistema autoalojado sin dependencias de terceros



\---



\### 2️⃣ MyZubster-Marketplace (App de ejemplo)



\*\*Repositorio:\*\* \[DanielIoni-creator/MyZubster-Marketplace](https://github.com/DanielIoni-creator/MyZubster-Marketplace)



Un \*\*fork demostrativo\*\* que muestra cómo integrar MyZubster en una aplicación real: un \*\*mercado de habilidades\*\* (inspirado en un sistema de "competencias de barrio").



\*\*Características:\*\*

\- 👤 \*\*Usuarios\*\* (registro, login, JWT)

\- 🛠️ \*\*Habilidades\*\* (publicación, búsqueda, filtros)

\- 💰 \*\*Pagos con Monero\*\* vía MyZubster

\- 📦 \*\*Pedidos\*\* con seguimiento de estado

\- 🔍 \*\*Verificación de pagos\*\* en tiempo real

\- 👨‍💼 \*\*Panel de vendedor\*\* (perfil, habilidades, ganancias)



\*\*Este fork es ideal para:\*\*

\- Entender cómo integrar MyZubster en una app

\- Usar como plantilla para tu propio proyecto

\- Contribuir al desarrollo del marketplace



\---



\## 🌍 El Proyecto "Competencias de Barrio"



Este proyecto nace con el objetivo de crear un \*\*ecosistema de habilidades locales\*\* donde las personas puedan:



\- \*\*Ofrecer\*\* sus habilidades (reparaciones, clases, consultoría, trabajos manuales)

\- \*\*Comprar\*\* habilidades de otros miembros de la comunidad

\- \*\*Pagar en Monero\*\* de forma privada y descentralizada

\- \*\*Construir\*\* una red de confianza y colaboración local



La app "Competencias de Barrio" es el caso de uso principal que demuestra cómo la tecnología Monero y la arquitectura modular de MyZubster pueden apoyar economías locales.



\---



\## 🚀 Inicio rápido



\### 1️⃣ Inicia MyZubster (pasarela de pagos)



```bash

git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git

cd MyZubsterAPP/backend

docker-compose up -d

2️⃣ Inicia el Marketplace (fork)

bash



git clone https://github.com/DanielIoni-creator/MyZubster-Marketplace.git

cd MyZubster-Marketplace

npm install

npm start



3️⃣ Configura el marketplace



Crea un archivo .env:

bash



cp .env.example .env



Edita con tus valores:

env



DATABASE\_URL=postgresql://postgres:password@localhost:5432/marketplace

MYZUBSTER\_API\_URL=http://localhost:3000

MYZUBSTER\_API\_TOKEN=tu\_token\_jwt



📋 Estructura del repositorio

text



MyZubster (Monorepo)

├── backend/                    # MyZubster Core (pasarela de pagos)

│   ├── app.js

│   ├── models/

│   ├── routes/

│   └── services/

│

├── marketplace/                # App de ejemplo (fork)

│   ├── server.js

│   ├── models/ (User, Skill, ServiceOrder)

│   ├── routes/ (users, skills, orders)

│   └── middleware/ (JWT auth)

│

├── web-dashboard/              # Panel de administración

├── mobile/                     # App Android (React Native)

└── docs/                       # Documentación



🔧 Personalización

Cómo adaptar el marketplace a tus necesidades

Modificación	Dónde

Añadir nuevas categorías de habilidades	models/Skill.js

Modificar el flujo del pedido	routes/orders.js

Añadir reseñas	Crear models/Review.js y routes/reviews.js

Cambiar la moneda predeterminada	.env → CURRENCY=USD

Añadir notificaciones por email	services/email.js

🤝 Contribuir



¡Las contribuciones son bienvenidas! Así puedes ayudar:



&#x20;   Haz fork del repositorio



&#x20;   Crea una rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad)



&#x20;   Haz commit de tus cambios (git commit -m 'Añadir nueva funcionalidad')



&#x20;   Haz push a la rama (git push origin feature/nueva-funcionalidad)



&#x20;   Abre una Pull Request



📄 Licencias



Este proyecto utiliza un modelo de doble licencia:



&#x20;   Licencia MIT para el core gateway y el marketplace (máxima libertad de integración)



&#x20;   GNU GPLv3 para la app Android y la aplicación full-stack (protección de la libertad del software)



Consulta los archivos LICENSE-MIT y LICENSE-GPLv3 para más detalles.

🌟 Soporte



Si encuentras útil este proyecto, ¡considera darle una estrella ⭐ en GitHub!

🔗 Enlaces útiles

Recurso	Enlace

MyZubster (Core)	https://github.com/DanielIoni-creator/MyZubsterAPP

MyZubster-Marketplace	https://github.com/DanielIoni-creator/MyZubster-Marketplace

Docker Hub	https://hub.docker.com/r/myzubster/myzubster

Autor	DanielIoni-creator



Hecho con ❤️ para la comunidad Monero y las economías locales de barrio 🏘️

