const express = require('express');

const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/auth');

const router = express.Router();


router.post('/signup', authController.postSignup);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', isAuth, authController.getLogout)


module.exports = router;