// database
let products = [
    {id: 1, uname: "Bonaqua", price: 10}
]

const getProductsController = (req, res) => {
    res.json(products)
}

module.exports = { getProductsController }