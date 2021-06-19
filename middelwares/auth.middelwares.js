const db = require('../db');

module.exports.requireAuth = (req,res,next) => {
    console.log(res.cookies);
    if (!req.cookies.userId) {
        res.redirect('login');
        return;
    }

    var user = db.get('users').find({id: req.cookies.userId}).value();
    if (!user) {
        res.render('login');
        return;
    }

    next();
}

