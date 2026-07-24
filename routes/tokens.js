const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'tokens route' });
});

module.exports = router;
