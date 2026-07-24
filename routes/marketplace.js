const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'marketplace route' });
});

module.exports = router;
