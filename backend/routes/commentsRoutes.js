const express = require('express');
const router = express.Router();

const commentsControllers = require('../controllers/commentsControllers');
const auth = require('../middlewares/auth');

router.post('/', auth, commentsControllers.createcomment);
router.get('/:id', auth, commentsControllers.getAllComments);
router.delete('/:id',auth, commentsControllers.deleteComment);

module.exports = router;