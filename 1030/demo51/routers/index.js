const {Router} = require("express")
const {indexController, currentController, testjsonController, testrequestController, testrequestController2} = require("../controllers")

const router = Router()

router.route('/').get(indexController)
router.route('/current').get(currentController)
router.route('/test-json').get(testjsonController)
router.route('/test-request').post(testrequestController)
router.route('/test-request2/:userid').post(testrequestController2)

module.exports = {router}