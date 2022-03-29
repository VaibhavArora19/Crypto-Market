const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const User = require('../models/user');

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password
    bcrypt.hash(password, 8)
        .then(hash => {
            const user = new User({
                name: name,
                email: email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getLogin = (req, res, next) => {
    res.render('login', { error: false });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.render('login', { error: true })
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log(req.session);
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return res.redirect('/');
                    }
                    res.render('login', { error: true });
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            if (err.statusCode === 422) {
                next(err);
            }
            console.log(err);
        })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(function(err) {
        if(err) {
           console.log(err); 
        }
        console.log('Successfully logged out');
        return res.redirect('/login');
    })
}