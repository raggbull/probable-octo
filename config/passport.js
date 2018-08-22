const bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });

    });

    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        },

        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({ where: { email: email } })
                .then(dbUser => {
                    if (dbUser) {
                        return done(null, false, { message: 'That username is already taken.' });
                    } else {
                        let userPassword = generateHash(password);
                        let data = {
                            email: email,
                            password: userPassword,
                            name: req.body.name,
                            bio: req.body.bio
                        };

                        User.create(data).then((newUser /*, created */) => {
                            if (!newUser) {
                                return done(null, false);
                            }

                            if (newUser) {
                                return done(null, newUser);
                            }
                        });
                    }
                });
        }

    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function (req, email, password, done) {
            const User = user;
            const isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({ where: { email: email } })
                .then(dbUser => {
                    if (!dbUser) {
                        return done(null, false, { message: 'Email does not exist.' });
                    }

                    if (!isValidPassword(dbUser.password, password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }

                    const userinfo = dbUser.get();
                    return done(null, userinfo);
                }).catch(err => {
                    console.log('Error: ', err);
                    return done(null, false, { message: 'Something went wrong with signin.'});
                });
        }
    ));
};