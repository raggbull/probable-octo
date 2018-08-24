
// for testing purposes we can toggle AUTH here.
const AUTH_ACTIVATED = true;

function isLoggedIn(req, res, next) {
  if (!AUTH_ACTIVATED) {
    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (!AUTH_ACTIVATED) {
    return next();
  }

  if (req.isAuthenticated() && req.user.permissions === 'admin') {
    return next();
  }

  res.status(403).send('Requires Admin Permissions');
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAdmin: isAdmin
};