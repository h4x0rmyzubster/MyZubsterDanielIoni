const express = require('express');
const router = express.Router();

// Route di test per auth
router.get('/', (req, res) => {
  res.json({ message: 'Auth route' });
});

router.post('/login', (req, res) => {
  res.json({ token: 'test-token', user: { id: 1, username: 'test' } });
});

module.exports = router;
