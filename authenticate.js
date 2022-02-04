const passport = require('passport');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const config = require('./config');

passport.use('local-user', new LocalStrategy({}, User.authenticate()));

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 36000 });
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

passport.use('jwt-user', new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));


exports.verifyUser = passport.authenticate('jwt-user', { session: false });
exports.loginUserLocal = passport.authenticate('local-user', { session: false });

