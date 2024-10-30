const { WEATHER_API_KEY, OPENCAGE_API_KEY } = require("../config/secrets")
const axios = require("axios")

const indexController = (req, res) => {
    res.render("index", {})
}

const ejsController = (req, res) => {
    res.render("dynamicejs", {
        "name": "Peter",
        "age": 28,
        "gender": "Male",
        "subjects": ["Chinese", "English", "Math", "Physics", "Chemisty", "Biology"]
    })
}

const forcastController = (req, res) => {
    location = req.query.q
    console.log(location)

    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${OPENCAGE_API_KEY}`)
    .then(result => {
        let jsonBody = result.data
        console.log(jsonBody.results[0].geometry.lat)
        console.log(jsonBody.results[0].geometry.lng)
        return {
            "lat": jsonBody.results[0].geometry.lat,
            "lng": jsonBody.results[0].geometry.lng
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
            "forecast": jsonData.hourly
        } 

        res.render("weather", outputData)
    })
}

const forcastController2 = async (req, res) => {
    location = req.query.q
    console.log(location)

    let result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${OPENCAGE_API_KEY}`)

    let jsonBody = result.data
    console.log(jsonBody.results[0].geometry.lat)
    console.log(jsonBody.results[0].geometry.lng)
    let coordinate = {
        "lat": jsonBody.results[0].geometry.lat,
        "lng": jsonBody.results[0].geometry.lng
    }

    // get weather
    // open weather API
    let weather_results = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coordinate.lat}&longitude=${coordinate.lng}&current_weather=true&hourly=temperature_2m,weather_code`)

    let jsonData = weather_results.data
    let outputData = {
        "lat": jsonData.latitude,
        "lng": jsonData.longitude,
        "temp": jsonData.current_weather.temperature,
        "wind_speed": jsonData.current_weather.windspeed,
        "wind_direction": jsonData.current_weather.winddirection,
        "forecast": jsonData.hourly
    } 

    res.json(outputData)
}

module.exports = { indexController, forcastController, ejsController }