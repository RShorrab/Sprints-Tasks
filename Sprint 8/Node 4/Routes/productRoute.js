import express from "express"
import productController from "../Controllers/productController.js"
import validation from "../middleware/validation.js"
import Schema from "../middleware/validation.schema.js"

const productRouter = express.Router()

productRouter.get('/', productController.getAllProducts)
productRouter.get('/categorized', productController.getCategorized)
productRouter.get('/curr=:curr', validation(Schema.rates), productController.getWithRate)
productRouter.get('/:id', validation(Schema.productIdParam), productController.getAProduct)
productRouter.post('/add', validation(Schema.addProduct), productController.addProduct)
productRouter.put('/update/:id', validation(Schema.updateProduct), productController.updateProduct)
productRouter.delete('/delete/:id', validation(Schema.productIdParam), productController.deleteProduct)

export default productRouter