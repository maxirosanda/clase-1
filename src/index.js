import express from "express"
import productsRouter from "./routes/products.router.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { engine } from 'express-handlebars';
import viewsRouter from "./routes/views.router.js"
import path from 'path';
import { fileURLToPath } from 'url';
import cartRouter from "./routes/cart.router.js"
import favoritesRouter from "./routes/favorites.routers.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
mongoose.connect(process.env.MONGO_URI)

app.use("/api/products",productsRouter)
app.use("/api/carts",cartRouter)
app.use("/api/favorites",favoritesRouter)
app.use("/",viewsRouter)

app.listen(process.env.PORT,()=> console.log("server in port: " + process.env.PORT))
