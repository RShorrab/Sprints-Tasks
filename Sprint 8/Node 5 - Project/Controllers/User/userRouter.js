import express from "express"
import userController from "./controller/userController.js"
import validation from "../../middleware/validation.js"
import {Schema} from "./userValidation.schema.js"

const router = express.Router()
 
router.get('/', userController.getUsers)
router.post('/signup', validation(Schema.signup), userController.signup)
router.post('/signin', validation(Schema.signin), userController.signin)




export default router