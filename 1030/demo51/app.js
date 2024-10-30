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