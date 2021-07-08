const express = require('express');
const router = express.Router();

const messagesControllers = require('../controllers/messagesControllers');

router.post('/', messagesControllers.createMessage);
router.get('/', messagesControllers.getAllMessages);
router.get('/:id', messagesControllers.getOneMessage);
router.delete('/:id', messagesControllers.deleteMessage);

module.exports = router;