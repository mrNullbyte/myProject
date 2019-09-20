const passport = require('passport');
const Localstrategy = require('passport-local');
const User = require('../model/user')
passport.use('local', new Localstrategy({usernameField:"mobile", passwordField:"password"}, async (mobile, password, done) => {
    try {
        let user = await User.find({
            mobile,
            password
        });
        if (user.length != 1) {
            return done(null, false, {})
        }
        return done(null, user[0])
    } catch (err) {
        throw err
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});
module.exports = {
    isLogin: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        throw {
            status: 403,
            message: "You're not logged in. Access denied."
        }
    }
};