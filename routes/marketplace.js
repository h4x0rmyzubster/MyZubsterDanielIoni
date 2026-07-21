const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const marketplaceService = require('../services/marketplaceService');

router.get('/orders/:tokenId', async (req, res) => {
  try {
    const orders = await marketplaceService.getOpenOrders(req.params.tokenId);
    res.json(orders);
  } catch (error) {
    console.error('Errore recupero ordini:', error);
    res.status(500).json({ error: 'Errore nel recupero degli ordini' });
  }
});

router.post('/sell', auth, async (req, res) => {
  try {
    const { tokenId, amount, price } = req.body;
    const order = await marketplaceService.createSellOrder(req.user._id, tokenId, amount, price);
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Errore creazione ordine:', error);
    res.status(500).json({ error: error.message || 'Errore nella creazione dell\'ordine' });
  }
});

router.post('/buy/:orderId', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const result = await marketplaceService.buyFromOrder(
      req.params.orderId,
      req.user._id,
      amount
    );
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Errore acquisto:', error);
    res.status(500).json({ error: error.message || 'Errore nell\'acquisto' });
  }
});

router.delete('/order/:orderId', auth, async (req, res) => {
  try {
    const order = await marketplaceService.cancelSellOrder(req.params.orderId, req.user._id);
    res.json({ success: true, order });
  } catch (error) {
    console.error('Errore cancellazione ordine:', error);
    res.status(500).json({ error: error.message || 'Errore nell\'annullamento' });
  }
});

module.exports = router;
