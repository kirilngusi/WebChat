const db = require('../db');

module.exports.login = (req,res) => {
    res.render('users/login');
};

module.exports.postLogin = (req,res) => {
    var username = req.body.Username;
    var passWord = req.body.password;
    var user = db.get('users').find({Username: username}).value();
    

    if (!user) {
        res.render('users/login', {
            errors: [
                'User does not exits.'
            ]
        });
        return;
    }
    if (user.password !== passWord) {
        res.render('users/login', {
            errors: [
                'Wrong password !'
            ]
        });
        return;

    }
    res.cookie('userId', user.id); 
    res.redirect('/users/home');
};