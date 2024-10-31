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

const createProductControler = (req, res) => {
    // Part 1: get user input
    let userInput = req.body

    // Part 2: Processing - save to database (products array)


    // Part 3: send result
}

const animalController = (req, res) => {
    let animal = req.params.animal

    res.send(`${animal} is best`)
}

const exponentController = (req, res) => {
    // Part 1: get user input (url params, query params, body)

    //URL Params
    let n = Number(req.params.n)
    let m = Number(req.params.m)

    //Query Params (?q=HongKong)
    let q = req.query.q

    //body
    let requestBody = req.body

    // Part 2: Processing
    let result = n**m

    // Part 3: send result
    //send text
    res.send(result.toString())

    //send json
    res.json()

    //send html
    res.render('template name', {})
}

const forecastController = (req, res) => {
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
            "location": location,
            "lat": jsonData.latitude,
            "lng": jsonData.longitude,
            "temp": jsonData.current_weather.temperature,
            "wind_speed": jsonData.current_weather.windspeed,
            "wind_direction": jsonData.current_weather.winddirection,
            "forecast": jsonData.hourly
        } 

        console.log(outputData)

        res.render("weather", outputData)
    })
}

const weatherDataController = (req, res) => {
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
            "location": location,
            "lat": jsonData.latitude,
            "lng": jsonData.longitude,
            "temp": jsonData.current_weather.temperature,
            "wind_speed": jsonData.current_weather.windspeed,
            "wind_direction": jsonData.current_weather.winddirection,
        } 

        res.json(outputData)
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

module.exports = { indexController, forecastController, ejsController, weatherDataController, animalController, exponentController }