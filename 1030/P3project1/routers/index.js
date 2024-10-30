const {Router} = require("express")
const {indexController, forcastController, ejsController} = require("../controllers")

const router = Router()

router.route('/').get(indexController)
router.route('/forcast').get(forcastController)
router.route('/test-ejs').get(ejsController)

module.exports = {router}