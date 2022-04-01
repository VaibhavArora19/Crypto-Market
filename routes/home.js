const express = require('express');

const isAuth = require('../middleware/is-auth');
const homeController = require('../controllers/home');

const router = express.Router();

router.get('/', isAuth, homeController.getHome);

router.get('/contact', isAuth, homeController.getContact);

router.post('/contact', isAuth, homeController.postContact);

router.get('/prices', isAuth, homeController.getPrices);

router.get('/graph', isAuth, homeController.getGraph);

router.get('/chart/:coinName',  homeController.getChart);

module.exports = router;