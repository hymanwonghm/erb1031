/*
1.Setup expressJS project
  i.Router, controller
  ii.Secrets
  iii. Views
  iv. Inside controller, set axios
2.Confirm number of API (forcastAPI)
3.Think about each API logic
  i.Get location (city)
  ii. Convert City to coordinates using OpenCage API
  iii. Use coordinates to request weather data from OpenMeteo / OpenWeatherAPI
  iv. Process data
  v. Output (as json)
4.Test  OpenMeteo
*/

/*
UI Steps:
1. Use HTML and CSS to create a page
2. Plig in data using EJS
*/

const express = require('express')
const path = require("path")
const {router} = require("./routers")

const app = express()
const port = 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use("/", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})