const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middleware/login.middleware');
const logoutMiddleware = require('../middleware/logout.middleware');

router.post('/login', loginMiddleware, (req, res) => {
    res.json({ token: req.token });
});

router.post('/logout', logoutMiddleware, (req, res) => {
    res.sendStatus(204);  
  });

module.exports = router;