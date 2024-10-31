const {Router} = require("express")
const {getProductsController, postProductsController, getProductsByIdController, patchProductsByIdController,deleteProductsByIdController, pyramidController} = require("../controllers")


const router = Router()

router.route('/products').get(getProductsController)
router.route('/products').post(postProductsController)
router.route('/products/:id').get(getProductsByIdController)
router.route('/products/:id').patch(patchProductsByIdController)
router.route('/products/:id').delete(deleteProductsByIdController)
router.route('/pyramid/:n').get(pyramidController)

module.exports = {router}