const { Router } = require("express")
const {indexController, forecastController, ejsController, weatherDataController, animalController, exponentController} = require("../controllers")
const {getProductsController} = require("../controllers/productController")

const router = Router()

router.route('/').get(indexController)
router.route('/forecast').get(forecastController)
router.route('/test-ejs').get(ejsController)
router.route('/weather').get(weatherDataController)
router.route('/api/:animal/').get(animalController)
router.route('/api/exponent/:n/:m').get(exponentController)

// Product Routes
router.route('/products').get(getProductsController)

module.exports = { router }