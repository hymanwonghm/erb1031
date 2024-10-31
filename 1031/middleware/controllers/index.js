// https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
var db = require("../userdb/db.js")

const indexController = (req, res) => {
    res.render("index", {})
}

const loginController = (req, res) => {
    res.render('login')
}

const logoutController = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/login');
    });
}

const signupController = (req, res) => {
    res.render('signup')
}

const signupActionController = (req, res) => {
    //Part1 encryption (No need)
    //Part2: Save to CB
    console.log(req.body.username)
    console.log(req.body.password)
    db.users.push({
        "username": req.body.username,
        "password": req.body.password
    })
    console.log(db.users)
    //Part3: login
    var user = {
        username: req.body.username
    }
    req.login(user, function(err){
        if (err) { return next(err);}
        res.redirect('/');
    })
  }



module.exports = {indexController, loginController,logoutController, signupController, signupActionController}
