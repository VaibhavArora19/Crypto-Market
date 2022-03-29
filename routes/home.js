const express = require('express');

const isAuth = require('../middleware/is-auth');
const homeController = require('../controllers/home');

const router = express.Router();

router.get('/', isAuth, homeController.getHome);

router.get('/contact', isAuth, homeController.getContact);

router.post('/contact', isAuth, homeController.postContact);

module.exports = router;