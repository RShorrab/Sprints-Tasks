import express from "express";
import productRouter from "./Routes/productRoute.js"
const app = express()


app.use(express.json())
app.use( "/products" ,productRouter)

app.get('/', (req, res)=> res.send('Hello World!'))
app.listen(3000, ()=> console.log("Listening on http://localhost:3000 ..."))