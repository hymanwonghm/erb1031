const { WEATHER_API_KEY } = require("../config/secrets.js")

const indexController = (req, res) => {
    res.render("index", {})
}

const currentController = (req, res) => {
    res.send('Current Weather 123')
}

const testjsonController = (req, res) => {
    let result = [
        {"uname": "Peter", "age": 18, "gender": "Male"},
        {"uname": "Paul", "age": 20, "gender": "Male"},
        {"uname": "Mary", "age": 22, "gender": "Female"}
    ]
    res.json(result)
}

const testrequestController = (req, res) => {
    console.log(WEATHER_API_KEY)
    let result = {
        "API_KEY": WEATHER_API_KEY
    }
    res.json(result)
}

const testrequestController2 = (req, res) => {
    console.log(req.params)
    let result = {
        "userId": req.params.userid,
        "uname": "Peter",
        "gender": "Male"
    }
    res.json(result)
}

module.exports = {indexController, currentController, testjsonController, testrequestController, testrequestController2}