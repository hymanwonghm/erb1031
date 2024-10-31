const axios = require('axios');
const { WEATHER_API_KEY } = require("../config/secrets.js")
const { ONPENCAGE_API_KEY } = require("../config/secrets.js")

const indexController = (req, res) => {
    res.render("index", {})
}

const forcastController = (req, res) => {
    let location = req.query.q
    console.log(location)

    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${ONPENCAGE_API_KEY}`)
    .then(result => {
        let jsonBody = result.data
        console.log(jsonBody.results[0].geometry.lat)
        console.log(jsonBody.results[0].geometry.lng)
        return {
            "lat": jsonBody.results[0].geometry.lat,
            "lng": jsonBody.results[0].geometry.lng,
        }
    }).then(result => {
        // get weather infomation and process
        return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${result.lat}&longitude=${result.lng}&current_weather=true&hourly=temperature_2m,weather_code`)
    }).then(result => {
        let jsonData = result.data
        let outputData = {
            "lat": jsonData.latitude,
            "lng": jsonData.longitude,
            "temp": jsonData.current_weather.temperature,
            "wind_speed": jsonData.current_weather.windspeed,
            "wind_direction": jsonData.current_weather.winddirection,
            "forecast": jsonData.hourly,
            "location": location
        }
        // lat, long, temp,wind speed, wind direction
        res.render("dynamicejs", {outputData})
    })

}

/*
1.On home page, user enter location 
2.Press Enter
3.A pop up will show weather information
    1.Press Enter
    2.AJAX call APQ to get weather info(in JSON)
    3.Process data and display pop up => fill in information in the card
*/

const weatherDataController = (req, res) => {
    let location = req.query.q
    console.log(location)

    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${ONPENCAGE_API_KEY}`)
    .then(result => {
        let jsonBody = result.data
        console.log(jsonBody.results[0].geometry.lat)
        console.log(jsonBody.results[0].geometry.lng)
        return {
            "lat": jsonBody.results[0].geometry.lat,
            "lng": jsonBody.results[0].geometry.lng,
        }
    }).then(result => {
        // get weather infomation and process
        return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${result.lat}&longitude=${result.lng}&current_weather=true&hourly=temperature_2m,weather_code`)
    }).then(result => {
        let jsonData = result.data
        let outputData = {
            "location": location,
            "lat": jsonData.latitude,
            "lng": jsonData.longitude,
            "temp": jsonData.current_weather.temperature,
            "wind_speed": jsonData.current_weather.windspeed,
            "wind_direction": jsonData.current_weather.winddirection
        }
        // lat, long, temp,wind speed, wind direction
        res.json(outputData)
    })
    
}

const ejsController = (req, res) => {
    res.render("dynamicejs", {
        
    })
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



module.exports = {indexController, forcastController, ejsController, weatherDataController, loginController, logoutController, signupController, signupActionController}
