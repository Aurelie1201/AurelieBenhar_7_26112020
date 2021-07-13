const express = require('express');
const router = express.Router();

const messagesControllers = require('../controllers/messagesControllers');
const auth = require('../middlewares/auth');

router.post('/', auth, messagesControllers.createMessage);
router.get('/', auth, messagesControllers.getAllMessages);
router.get('/:id', messagesControllers.getOneMessage);
router.delete('/:id', messagesControllers.deleteMessage);

module.exports = router;