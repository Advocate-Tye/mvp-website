module.exports = {
  ensureAdmin: (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
      return next();
    }
    req.flash('error_msg', 'You do not have the privileges to view this page');
    res.redirect('/users/login');
  }
}
