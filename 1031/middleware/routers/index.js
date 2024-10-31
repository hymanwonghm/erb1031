const {Router} = require("express")
const {indexController, loginController,logoutController, signupController, signupActionController} = require("../controllers")
var passport = require('passport')
const {checkAuthenticated, checkLoggedIn} = require("../middleware/auth-middleware.js")



const router = Router()

router.route('/').get(checkAuthenticated, indexController)
router.route('/login').get(checkLoggedIn, loginController)
router.route('/login/password').post(
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
    }));
router.route('/logout').get(logoutController)
router.route('/signup').get(signupController)
router.route('/signup').post(signupActionController)


module.exports = {router}