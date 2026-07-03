const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Skill = require('../models/Skill');
const Review = require('../models/Review');
const Report = require('../models/Report');
const { authenticate, authorize } = require('../middleware/auth');

// ============================================
// MIDDLEWARE DI AUTORIZZAZIONE
// ============================================
const requireAdmin = authorize('admin');
const requireModerator = authorize('moderator', 'admin');

// ============================================
// 1. GESTIONE SEGNALAZIONI
// ============================================

// GET /api/admin/reports - Lista tutte le segnalazioni con filtri e paginazione
router.get('/reports', authenticate, requireModerator, async (req, res) => {
    try {
        const { status, type, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (type) filter.type = type;

        const reports = await Report.find(filter)
            .populate('reporterId', 'username name avatarUrl')
            .populate('targetUserId', 'username name avatarUrl')
            .populate('targetSkillId', 'title category')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Report.countDocuments(filter);

        res.json({
            success: true,
            data: reports,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Errore nel recupero delle segnalazioni:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// POST /api/admin/reports - Crea una nuova segnalazione
router.post('/reports', authenticate, async (req, res) => {
    try {
        const { targetUserId, targetSkillId, type, reason, description } = req.body;
        const reporterId = req.user.id;

        // Validazione base
        if (!targetUserId && !targetSkillId) {
            return res.status(400).json({
                success: false,
                error: 'È necessario specificare targetUserId o targetSkillId'
            });
        }

        if (!type || !reason) {
            return res.status(400).json({
                success: false,
                error: 'Tipo e motivo della segnalazione sono obbligatori'
            });
        }

        // Crea la segnalazione
        const report = new Report({
            reporterId,
            targetUserId,
            targetSkillId,
            type,
            reason,
            description,
            status: 'pending'
        });

        await report.save();

        // Popola i dati dell'utente per la risposta
        await report.populate('reporterId', 'username name');
        await report.populate('targetUserId', 'username name');

        res.status(201).json({
            success: true,
            data: report,
            message: 'Segnalazione creata con successo'
        });
    } catch (error) {
        console.error('Errore nella creazione della segnalazione:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// PUT /api/admin/reports/:id - Aggiorna lo stato di una segnalazione
router.put('/reports/:id', authenticate, requireModerator, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, moderationNote } = req.body;

        if (!['pending', 'resolved', 'dismissed'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Stato non valido. Usa: pending, resolved, dismissed'
            });
        }

        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({
                success: false,
                error: 'Segnalazione non trovata'
            });
        }

        report.status = status;
        report.moderationNote = moderationNote || report.moderationNote;
        report.moderatedBy = req.user.id;
        report.moderatedAt = new Date();

        await report.save();

        await report.populate('reporterId', 'username name');
        await report.populate('targetUserId', 'username name');

        res.json({
            success: true,
            data: report,
            message: `Segnalazione ${status === 'resolved' ? 'risolta' : 'archiviata'} con successo`
        });
    } catch (error) {
        console.error('Errore nell\'aggiornamento della segnalazione:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// ============================================
// 2. GESTIONE UTENTI
// ============================================

// GET /api/admin/users - Lista utenti con filtri
router.get('/users', authenticate, requireModerator, async (req, res) => {
    try {
        const { search, role, status, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { name: { $regex: search, $options: 'i' } }
            ];
        }
        if (role) filter.role = role;
        if (status === 'active') filter.active = true;
        if (status === 'suspended') filter.active = false;

        const users = await User.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await User.countDocuments(filter);

        res.json({
            success: true,
            data: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Errore nel recupero degli utenti:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// PUT /api/admin/users/:id/status - Attiva/sospendi un utente
router.put('/users/:id/status', authenticate, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { active, reason } = req.body;

        if (active === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Il campo "active" è obbligatorio'
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Utente non trovato'
            });
        }

        // Impedisci di disattivare se stesso
        if (user._id.toString() === req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Non puoi disattivare il tuo stesso account'
            });
        }

        user.active = active;
        user.suspensionReason = active ? null : reason || 'Sospeso dall\'amministratore';
        user.updatedAt = new Date();

        await user.save();

        res.json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                active: user.active,
                suspensionReason: user.suspensionReason
            },
            message: active ? 'Utente riattivato' : 'Utente sospeso'
        });
    } catch (error) {
        console.error('Errore nell\'aggiornamento dello stato utente:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// PUT /api/admin/users/:id/role - Cambia il ruolo di un utente
router.put('/users/:id/role', authenticate, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'moderator', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                error: 'Ruolo non valido. Usa: user, moderator, admin'
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Utente non trovato'
            });
        }

        // Impedisci di cambiare il ruolo dell'ultimo admin
        if (role !== 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount === 1 && user.role === 'admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Non puoi rimuovere l\'ultimo amministratore'
                });
            }
        }

        user.role = role;
        user.updatedAt = new Date();
        await user.save();

        res.json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                role: user.role
            },
            message: `Ruolo aggiornato a ${role}`
        });
    } catch (error) {
        console.error('Errore nel cambio di ruolo:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// ============================================
// 3. MODERAZIONE COMPETENZE
// ============================================

// GET /api/admin/skills - Lista competenze da moderare
router.get('/skills', authenticate, requireModerator, async (req, res) => {
    try {
        const { status, category, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (category) filter.category = category;

        const skills = await Skill.find(filter)
            .populate('userId', 'username name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Skill.countDocuments(filter);

        res.json({
            success: true,
            data: skills,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Errore nel recupero delle competenze:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// PUT /api/admin/skills/:id/status - Approva/rifiuta una competenza
router.put('/skills/:id/status', authenticate, requireModerator, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, moderationNote } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Stato non valido. Usa: pending, approved, rejected'
            });
        }

        const skill = await Skill.findById(id);
        if (!skill) {
            return res.status(404).json({
                success: false,
                error: 'Competenza non trovata'
            });
        }

        skill.status = status;
        skill.moderationNote = moderationNote || skill.moderationNote;
        skill.moderatedBy = req.user.id;
        skill.moderatedAt = new Date();

        await skill.save();

        res.json({
            success: true,
            data: skill,
            message: `Competenza ${status === 'approved' ? 'approvata' : 'rifiutata'}`
        });
    } catch (error) {
        console.error('Errore nella moderazione della competenza:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// ============================================
// 4. STATISTICHE E LOG
// ============================================

// GET /api/admin/stats - Statistiche generali
router.get('/stats', authenticate, requireModerator, async (req, res) => {
    try {
        const [users, skills, reviews, reports] = await Promise.all([
            User.countDocuments(),
            Skill.countDocuments(),
            Review.countDocuments(),
            Report.countDocuments()
        ]);

        const pendingReports = await Report.countDocuments({ status: 'pending' });
        const pendingSkills = await Skill.countDocuments({ status: 'pending' });

        res.json({
            success: true,
            data: {
                users,
                skills,
                reviews,
                reports,
                pendingReports,
                pendingSkills
            }
        });
    } catch (error) {
        console.error('Errore nel recupero delle statistiche:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// GET /api/admin/logs - Log delle azioni di moderazione
router.get('/logs', authenticate, requireAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;

        const logs = await ModerationLog.find()
            .populate('userId', 'username name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await ModerationLog.countDocuments();

        res.json({
            success: true,
            data: logs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Errore nel recupero dei log:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server' });
    }
});

// ============================================
// 5. MODELLI NECESSARI
// ============================================

// Modello Report (da creare in backend/src/models/Report.js)
/*
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetSkillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    type: { type: String, enum: ['user', 'skill', 'message'], required: true },
    reason: { type: String, required: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'resolved', 'dismissed'], default: 'pending' },
    moderationNote: { type: String, trim: true },
    moderatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    moderatedAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
*/

// Modello ModerationLog (da creare in backend/src/models/ModerationLog.js)
/*
const mongoose = require('mongoose');

const ModerationLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    targetId: { type: String },
    targetType: { type: String },
    details: { type: mongoose.Schema.Types.Mixed },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ModerationLog', ModerationLogSchema);
*/

module.exports = router;