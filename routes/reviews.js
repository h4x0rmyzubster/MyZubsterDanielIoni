const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// CREATE
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const { toUser, rating, limit = 20, page = 1 } = req.query;
    const query = { isPublic: true };
    if (toUser) query.toUser = toUser;
    if (rating) query.rating = parseInt(rating);

    const reviews = await Review.find(query)
      .populate('fromUser', 'username firstName lastName')
      .populate('toUser', 'username firstName lastName')
      .populate('order')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments(query);
    res.json({
      success: true,
      data: reviews,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('fromUser', 'username firstName lastName')
      .populate('toUser', 'username firstName lastName')
      .populate('order');
    if (!review) return res.status(404).json({ success: false, error: 'Recensione non trovata' });
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ success: false, error: 'Recensione non trovata' });
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, error: 'Recensione non trovata' });
    res.json({ success: true, message: 'Recensione eliminata con successo' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;