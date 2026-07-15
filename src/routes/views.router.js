import { Router } from "express";
import  productModel  from "../models/products.model.js";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await productModel.find({}).lean()
        res.render('home', { products })
    }catch (error) {
        res.json({status:"error",message:error.message})
    }
});

router.get("/cart", async (req,res)=>{
    res.render("cart")
})

router.get("/favorites", async (req,res)=>{
    try {
        const favorites = await productModel.find({}).lean()
        res.render("favorites",{favorites})
    }catch (error) {
        res.json({status:"error",message:error.message})
    }
})

export default router