const express = require('express');
const router = express.Router();

const messagesControllers = require('../controllers/commentsControllers');

router.post('/', messagesControllers.createcomment);
router.get('/:id', messagesControllers.getAllComments);
router.delete('/:id', messagesControllers.deleteComment);

module.exports = router;