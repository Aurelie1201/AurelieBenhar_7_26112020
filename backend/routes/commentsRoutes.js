const express = require('express');
const router = express.Router();

const messagesControllers = require('../controllers/commentsControllers');
const auth = require('../middlewares/auth');

router.post('/', auth, messagesControllers.createcomment);
router.get('/:id', auth, messagesControllers.getAllComments);
router.delete('/:id',auth, messagesControllers.deleteComment);

module.exports = router;