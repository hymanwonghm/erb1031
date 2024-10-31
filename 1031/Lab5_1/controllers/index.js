let products = [
    {"id":1, "uname": "Bonaqua", "price":10}
]

const getProductsController = (req, res) => {
    res.json(products)
}

const postProductsController = (req, res) => {
    let userInput = req.body
    products.push(userInput)
    res.json(products)
}

const getProductsByIdController = (req, res) => {
    let ID = Number(req.params.id)
    // let reult = products.find((element) => element.id === ID)
    res.json(products[ID - 1])
}

/*
const patchProductsByIdController = (req, res) => {
    console.log("Enter")
    let ID = Number(req.params.id)
    let addedObect = req.body
    products[ID - 1].uname = addedObect.uname
    products[ID - 1].price = addedObect.price
    res.json(products)
}
*/
const patchProductsByIdController = (req, res) => {
    let updatedProductId = Number(req.params.id)
    let updatedProduct = req.body
    let start = products.findIndex((element) => element.id === updatedProductId)
    products.splice(start, 1, updatedProduct)
    res.json(updatedProduct)
}

const deleteProductsByIdController = (req, res) => {
    let ID = Number(req.params.id)
    const newProducts = products.filter((product) => product.id !== ID)
    for (let i = ID; i < newProducts.length; i++) {
        newProducts.id = i - 1
    }
    produts = newProducts
    res.json(produts)
}

const pyramidController = (req, res) => {
    let n = Number(req.params.n)
    console.log(n)
    let output = ''
    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= i; j++) {
            output += '*'
        }
        output += '\n'
    }
    console.log(output)
    res.send(output)
}
/*
*/

module.exports = {getProductsController, postProductsController, getProductsByIdController,patchProductsByIdController,deleteProductsByIdController,pyramidController}
