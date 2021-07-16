const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers');
const auth = require('../middlewares/auth');

router.post('/signup', usersControllers.signup);
router.post('/login', usersControllers.login);
router.get('/:id', auth, usersControllers.getUser);
router.delete('/:id', auth, usersControllers.deleteUser);

module.exports = router;