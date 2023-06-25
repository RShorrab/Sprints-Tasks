import dotenv from 'dotenv'; dotenv.config()
import express from "express";
import userRouter from "./Controllers/User/userRouter.js"
import productRouter from "./Controllers/Product/productRoute.js"
import categoryRouter from "./Controllers/Category/categoryRouter.js"

const app = express()

app.use(express.json())
app.use( "/user", userRouter)
app.use( "/products", productRouter)
app.use( "/categories", categoryRouter)


app.get('/', (req, res)=> res.send('Hello World!'))
app.listen(3000, ()=> console.log("Listening on http://localhost:3000 ..."))
