import express from "express"
import productController from "./controller/productController.js"
import validation from "../../middleware/validation.js"
import Schema from "./productValidation.schema.js"
import { Auth } from "../../middleware/auth.js"
import endpoints from "./productAuth.js"

let {auth} = Auth;
const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/categorized', productController.getCategorized)
router.get('/curr=:curr', validation(Schema.rates), productController.getWithRate)
router.get('/:id', validation(Schema.productIdParam), productController.getProduct)
router.post('/add', auth(endpoints.all), validation(Schema.addProduct), productController.addProduct)
router.put('/update/:id', auth(endpoints.all), validation(Schema.updateProduct), productController.updateProduct)
router.delete('/delete/:id', auth(endpoints.all), validation(Schema.productIdParam), productController.deleteProduct)

export default router