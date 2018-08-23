
module.exports = function (app, passport) {
  app.get('/signup', function (req, res) {
    res.render('signup', {});
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }));

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
  }));

  // function isLoggedIn(req, res, next) {
  //     if (req.isAuthenticated()) {
  //         return next();
  //     }

  //     res.redirect('/signin');
  // }

};