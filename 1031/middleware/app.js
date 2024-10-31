const express = require('express')
const path = require("path")
const {router} = require("./routers")
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
var db = require("./userdb/db");
const { logging } = require("./middleware/logging-middleware")
const app = express()
const port = 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logging)

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(function verify(username, password, cb) {
  console.log("Start Verify")

  
  console.log(username)
  console.log(password)
  console.log(db.users)

  
  const user = db.users.find(user => user.username === username);

  if(! user) {
    return cb(null, false)
  } 
  
  if (user.password === password) {
    console.log("Success Login Case")
    cb(null, {"username": "erb"})
  }else{
    console.log("Fail Login Case")
    cb(null, false)
  }
  
}));

passport.serializeUser((user, done)=>{
  done(null, user.username)
})

passport.deserializeUser((username, done)=>{
  done(null, {username: username})
})

app.use("/", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})