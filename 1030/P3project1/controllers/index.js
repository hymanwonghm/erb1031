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

const animalController = (req, res) => {
    let animal = req.params.animal
    res.send(`${animal} is the best`)
}

const exponentController = (req, res) => {
    let x = Number(req.params.n)
    let m = Number(req.params.m)
    let result = x ** m
    res.send(result.toString())
}

//
let products = [
    {"id":1, "uname": "Bonaqua", "price":10}
]

const getProductsController = (req, res) => {
    res.send(products)
}

const postProductsController = (req, res) => {
    let userInput = req.body
    products.push(userInput)
    res.send(products)
}

const getProductsByIdController = (req, res) => {
    let ID = Number(req.params.id)
    res.send(products[ID - 1])
}

const patchProductsByIdController = (req, res) => {
    console.log("Enter")
    let ID = Number(req.params.id)
    let addedObect = req.body
    console.log(ID)
    console.log(addedObect)
    res.json()
    
}

const deleteProductsByIdController = (req, res) => {
    let ID = Number(req.params.id)
    const newProducts = products.filter((product) => product.id !== ID)
    res.json(newProducts)
}


module.exports = {indexController, forcastController, ejsController, weatherDataController, animalController, exponentController, getProductsController, postProductsController, getProductsByIdController, patchProductsByIdController,deleteProductsByIdController}
