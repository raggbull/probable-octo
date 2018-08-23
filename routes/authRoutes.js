
module.exports = function (app, passport) {
  // app.get('/signup', function (req, res) {
  //   res.render('signup', {});
  // });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register'
  }));

  app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // function isLoggedIn(req, res, next) {
  //     if (req.isAuthenticated()) {
  //         return next();
  //     }

  //     res.redirect('/signin');
  // }

};