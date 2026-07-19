const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// CREATE
router.post('/', async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const { category, status, zone, limit = 20, page = 1 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (zone) query.zone = { $regex: zone, $options: 'i' };

    const requests = await Request.find(query)
      .populate('user', 'username firstName lastName')
      .populate('selectedOffer')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Request.countDocuments(query);
    res.json({
      success: true,
      data: requests,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('user', 'username firstName lastName').populate('selectedOffer');
    if (!request) return res.status(404).json({ success: false, error: 'Richiesta non trovata' });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!request) return res.status(404).json({ success: false, error: 'Richiesta non trovata' });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Richiesta non trovata' });
    res.json({ success: true, message: 'Richiesta eliminata con successo' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;