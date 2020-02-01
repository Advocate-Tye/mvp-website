module.exports = {
  ensureAuthenticated: (req, res, next) => {
    console.log(req.isAuthenticated());

    if(req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please login to view your dashboard');
    res.redirect('/users/login');
  }
}
