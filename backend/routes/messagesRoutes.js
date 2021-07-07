const express = require('express');
const router = express.Router();

const messagesControllers = require('../controllers/messagesControllers');

router.post('/create', messagesControllers.createMessage);

module.exports = router;