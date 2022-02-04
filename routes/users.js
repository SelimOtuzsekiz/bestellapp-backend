const express = require('express');
const User = require('../models/user.model');
const passport = require('passport');
const { verifyUser, loginUserLocal, getToken } = require('../authenticate');

const Router = express.Router();


Router.route('/')
    .get(verifyUser, (req, res, next) => {
    
        User.find({})
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

Router.post('/signup',  (req, res, next) => {
    User.register(new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
            else {
                if (req.body.vorname)
                    user.vorname = req.body.vorname;
                if (req.body.nachname)
                    user.nachname = req.body.nachname;
                
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    loginUserLocal(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful' });
                    });
                });
            }
        });
});

Router.post('/login', loginUserLocal, (req, res) => {
    var token = getToken({ _id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log(req.user);
    res.json({ success: true, token: token, status: 'You are successfully logged in' });
});

Router.post("/changePassword", verifyUser, (req, res) => {
    console.log(req.user);
    User.findById(req.user._id)
        .then((user) => {
            user.changePassword(req.body.oldPassword, req.body.newPassword)
                .then(() => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                })
        })

});

Router.route('/:userId')

    .get(verifyUser, (req, res, next) => {

        User.findById(req.params.userId)
        //.select('vorname nachname username salt hash')
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put(verifyUser, (req, res, next) => {

    
        User.findById(req.params.userId)
            .then((data) => {
                if (req.body.nachname) {
                    data.nachname = req.body.nachname;
                }
                if (req.body.vorname) {
                    data.vorname = req.body.vorname;
                }
              
                data.save().then((data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                })

            }, (err) => next(err))
            .catch((err) => next(err));
    })



    .delete(verifyUser, (req, res, next) => {

        User.findByIdAndRemove(req.params.userId)
            .then((data) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = Router;