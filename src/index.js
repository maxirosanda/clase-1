import express from "express"
import productsRouter from "./routes/products.router.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())
mongoose.connect(process.env.MONGO_URI)

app.use("/api/products",productsRouter)

app.listen(process.env.PORT,()=> console.log("server in port: " + process.env.PORT))
