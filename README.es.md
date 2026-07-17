# MyZubster 🏦

**Pasarela de pago Monero autoalojada**

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Monero](https://img.shields.io/badge/Monero-0.18.x-orange.svg)](https://www.getmonero.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)](https://www.docker.com/)

---

## 📖 ¿Qué es MyZubster?

MyZubster es una **pasarela de pago Monero autoalojada** diseñada para ser modular y fácilmente integrable en cualquier aplicación.

**Características principales:**
- ✅ **Autoalojado** — sin servicios de terceros, control total
- ✅ **Subdirecciones únicas** — cada pedido tiene su dirección Monero
- ✅ **Tasa de cambio en tiempo real** — XMR/USD vía CoinGecko API
- ✅ **Monitoreo automático** — verifica pagos cada 60 segundos
- ✅ **Autenticación JWT** — acceso seguro a las API
- ✅ **Persistencia PostgreSQL** — pedidos persistentes
- ✅ **Listo para Docker** — despliegue con un comando

---

## 🚀 Inicio rápido con Docker

```bash
git clone https://github.com/DanielIoni-creator/MyZubsterAPP.git
cd MyZubsterAPP/backend
cp .env.example .env
docker-compose up -d
La API estará disponible en http://localhost:3000
🔧 Endpoints API
Método	Endpoint	Descripción
POST	/api/auth/login	Inicia sesión y obtén token JWT
POST	/api/orders	Crea un nuevo pedido
GET	/api/orders	Lista todos los pedidos
GET	/api/orders/:id	Obtén pedido por ID
GET	/api/orders/status/:status	Pedidos por estado
GET	/api/health	Health check
🔗 Proyectos relacionados

    MyZubster-Marketplace — Marketplace de ejemplo → GitHub

    MyZubster-App — App Android → GitHub

📄 Licencia

Licencia MIT

Hecho con ❤️ para la comunidad Monero 🏘️