const {Router} = require("express")
const {indexController, forcastController, ejsController, weatherDataController, animalController, exponentController, getProductsController, postProductsController, getProductsByIdController, patchProductsByIdController,deleteProductsByIdController} = require("../controllers")


const router = Router()

router.route('/').get(indexController)
router.route('/forcast').get(forcastController)
router.route('/test-ejs').get(ejsController)
router.route('/weather').get(weatherDataController)
router.route('/api/:animal').get(animalController)
router.route('/api/exponent/:n/:m').get(exponentController)
router.route('/products').get(getProductsController)
router.route('/products').post(postProductsController)
router.route('/products/:id').get(getProductsByIdController)
router.route('/products/:id').patch(patchProductsByIdController)
router.route('/products/:id').delete(deleteProductsByIdController)

module.exports = {router}