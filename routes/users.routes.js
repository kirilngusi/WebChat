const express = require('express');
// const db = require('../db');

//require module prject to me
const controller = require('../controllers/users.controllers');
// const controllerClient = require('../controllers/client.controllers');
const authMiddelwares = require('../middelwares/auth.middelwares');

//router
const router = express.Router();

router.get('/login',controller.login);
// router.post('/login', controller.postLogin);


router.get('/register', controller.register);

router.post('/register', controller.postCreate);

router.get('/home', authMiddelwares.requireAuth  , controller.home);

router.get('/cookie', (req,res) => {
    res.cookie('user-id', 12345);
});


module.exports = router;
