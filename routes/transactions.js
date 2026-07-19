const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// CREATE
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// READ ALL (con filtri)
router.get('/', async (req, res) => {
  try {
    const { fromUser, toUser, status, type, limit = 20, page = 1 } = req.query;
    const query = {};
    if (fromUser) query.fromUser = fromUser;
    if (toUser) query.toUser = toUser;
    if (status) query.status = status;
    if (type) query.type = type;

    const transactions = await Transaction.find(query)
      .populate('fromUser', 'username')
      .populate('toUser', 'username')
      .populate('order')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Transaction.countDocuments(query);
    res.json({
      success: true,
      data: transactions,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('fromUser', 'username')
      .populate('toUser', 'username')
      .populate('order')
      .populate('offer')
      .populate('request');
    if (!transaction) return res.status(404).json({ success: false, error: 'Transazione non trovata' });
    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!transaction) return res.status(404).json({ success: false, error: 'Transazione non trovata' });
    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;