const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

// CSRF Protection
const csrf = require('csrf');
const tokens = new csrf();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// 1. MIDDLEWARE DI SICUREZZA E BASE
// ============================================================

// Helmet: imposta header di sicurezza
app.use(helmet({
    contentSecurityPolicy: false, // Disabilitato per test locale
}));

// Compressione
app.use(compression());

// CORS
app.use(cors({
    origin: true,
    credentials: true,
}));

// Logging
app.use(morgan('dev'));

// Parsing JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// 2. CSRF PROTECTION
// ============================================================

// Genera token CSRF per ogni richiesta GET
app.use((req, res, next) => {
    const secret = tokens.secretSync();
    const token = tokens.create(secret);
    res.cookie('XSRF-TOKEN', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
    req.csrfToken = token;
    res.locals.csrfToken = token;
    next();
});

// Verifica token per richieste che modificano dati (POST, PUT, DELETE, PATCH)
app.use((req, res, next) => {
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        const token = req.headers['x-xsrf-token'] || req.body._csrf;
        if (!tokens.verify(req.csrfToken, token)) {
            return res.status(403).json({ error: 'Invalid CSRF token' });
        }
    }
    next();
});

// ============================================================
// 3. SERVI FILE STATICI (FRONTEND)
// ============================================================

const frontendPath = path.join(__dirname, '..', 'myzubster-frontend', 'dist');
try {
    if (require('fs').existsSync(frontendPath)) {
        app.use(express.static(frontendPath));
        console.log('📁 Frontend statico servito da:', frontendPath);
    }
} catch (err) {
    console.log('📁 Frontend non trovato, server solo API');
}

// ============================================================
// 4. ROUTE API
// ============================================================

app.use('/api/users', require('./routes/users'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/orders', require('./routes/orders'));

// ============================================================
// 5. HEALTH CHECK
// ============================================================

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================
// 6. CATCH-ALL PER SPA (SERVE INDEX.HTML)
// ============================================================

app.get('*', (req, res) => {
    try {
        const indexPath = path.join(frontendPath, 'index.html');
        if (require('fs').existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).json({ error: 'Endpoint non trovato' });
        }
    } catch (err) {
        res.status(404).json({ error: 'Endpoint non trovato' });
    }
});

// ============================================================
// 7. AVVIO DEL SERVER
// ============================================================

app.listen(PORT, () => {
    console.log(`🚀 Server avviato su http://localhost:${PORT}`);
    console.log(`📦 Modalità: ${process.env.NODE_ENV || 'development'}`);
    console.log('✅ Route caricate: /api/users, /api/skills, /api/orders');
    console.log('✅ CSRF protection attiva');
    console.log(`🔒 CSRF cookie: XSRF-TOKEN (${process.env.NODE_ENV === 'production' ? 'Secure' : 'HttpOnly'})`);
});