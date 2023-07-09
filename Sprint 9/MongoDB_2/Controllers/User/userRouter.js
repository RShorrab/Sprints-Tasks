import express from "express"
import userController from "./controller/userController.js"
import validation from "../../middleware/validation.js"
import {Schema} from "./userValidation.schema.js"
import { Auth } from "../../middleware/auth.js"
import endpoints from "./userAuth.js"

let {auth} = Auth;
const router = express.Router()
router.post('/signup', validation(Schema.signup), userController.signup)
router.post('/signin', validation(Schema.signin), userController.signin)
router.get('/:id', auth(endpoints.all), validation(Schema.userIdParam), userController.accountInfo)
router.put("/update", auth(endpoints.all), validation(Schema.updateUser), userController.updateAccount)
router.delete("/delete", auth(endpoints.all), validation(Schema.deleteAccount), userController.deleteAccount)

export default router