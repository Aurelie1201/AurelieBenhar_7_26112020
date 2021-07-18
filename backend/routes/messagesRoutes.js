const express = require('express');
const router = express.Router();

const messagesControllers = require('../controllers/messagesControllers');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, messagesControllers.createMessage);
router.get('/', auth, messagesControllers.getAllMessages);
router.get('/:id', auth, messagesControllers.getOneMessage);
router.delete('/:id', auth, messagesControllers.deleteMessage);

module.exports = router;