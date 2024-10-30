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

const ejsController = (req, res) => {
    res.render("dynamicejs", {
        
    })
}

module.exports = {indexController, forcastController, ejsController}
