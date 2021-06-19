const express = require('express');

//require module prject to me
const controller = require('../controllers/auth.controllers');

//router
const router = express.Router();

router.get('/login', controller.login);
router.post('/login', controller.postLogin);


module.exports = router;