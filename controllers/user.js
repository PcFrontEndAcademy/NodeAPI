const passport = require('passport');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

exports.login = async function login(request, response) {
    passport.authenticate('login', async (error, user, info) => {
        try {
            if (error || !user) {
                response.send(info);
            }

            request.login(user, { session: false }, async (loginError) => {
                if (loginError) {
                    response.send(loginError);
                }
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, CONFIG.JWT_SECRET);
                response.json({ token });
            });
        } catch (err) {
            response.send(err.message);
        }
    })(request, response);
};
