const express = require('express');
const router = express.Router();

const messagesControllers = require('../controllers/commentsControllers');

router.post('/', messagesControllers.createcomment);

module.exports = router;