import express from "express"
import categoryController from "./controller/categoryController.js"
import validation from "../../middleware/validation.js"
import Schema from "./categoryValidation.schema.js"
import { Auth } from "../../middleware/auth.js"
import endpoints from "./categoryAuth.js"

let {auth} = Auth;
const router = express.Router()

router.get('/', categoryController.getAllCategories)
router.get('/:id', validation(Schema.categoryIdParam), categoryController.getCategory)
router.post('/add', auth(endpoints.all), validation(Schema.addCategory), categoryController.addCategory)
router.put('/update/:id', auth(endpoints.adminOnly), validation(Schema.updateCategory), categoryController.updateCategory)
router.delete('/delete/:id', auth(endpoints.adminOnly), validation(Schema.categoryIdParam), categoryController.deleteCategory)

export default router