const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// CREATE
router.post('/', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json({ success: true, data: offer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const { status, limit = 20, page = 1 } = req.query;
    const query = {};
    if (status) query.status = status;

    const offers = await Offer.find(query)
      .populate('skill')
      .populate('user', 'username firstName lastName')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Offer.countDocuments(query);
    res.json({
      success: true,
      data: offers,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate('skill').populate('user', 'username firstName lastName');
    if (!offer) return res.status(404).json({ success: false, error: 'Offerta non trovata' });
    res.json({ success: true, data: offer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!offer) return res.status(404).json({ success: false, error: 'Offerta non trovata' });
    res.json({ success: true, data: offer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ success: false, error: 'Offerta non trovata' });
    res.json({ success: true, message: 'Offerta eliminata con successo' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;