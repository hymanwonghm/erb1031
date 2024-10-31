const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
      return next() 
    } else {
      res.redirect("/login")
    }
}
const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { 
      res.redirect("/") 
    } else {
      return next()}
  }

module.exports = {checkAuthenticated, checkLoggedIn}