import favoriteModel from "../models/favorites.model.js"
import mongoose from "mongoose";

const addToFavorites =  async (req,res)=>{
    if (!req.body) {
        return res.status(400).json({status:"error", message: 'Body vacío o mal formado' });
    }
    const {productId} = req.body
    if(!productId) return res.json({status:"error",message:"falta productId"})
    try {
        const favoriteExists = await favoriteModel.findOne({userId:"507f1f77bcf86cd799439011"})
        if(!favoriteExists){
             const favorite = await favoriteModel.create({userId:"507f1f77bcf86cd799439011",products:[productId]})
             return res.json({status:"success",message:"favorite created",data:favorite})
        }
        const productExists = favoriteExists.products.find(product => {
            console.log(product.toString())
            console.log(productId)
            return product.toString() === productId
        })
        console.log("dsfsadfa")
        if(productExists) return res.json({status:"error",message:"product already exists"})
        const favorite = await favoriteModel.findOneAndUpdate(
            { userId: "507f1f77bcf86cd799439011" },
            { $push: { products: productId } },
            { new: true }
        );
        return res.json({status:"success",message:"product add"})
        
    } catch (error) {
        res.json({status:"error",message:error.message})
    }
}

const getFavorites = async (req,res)=>{
    try {
        const favorites = await favoriteModel.find({userId:"507f1f77bcf86cd799439011"}).populate("products").lean()
        console.log(favorites)
        res.json({status:"success",message:"favorites",data:favorites.products})
    } catch (error) {
        res.json({status:"error",message:error.message})
    }
}

const removeFromFavorites =  async (req, res) => {
    const { productId } = req.params;
    try {
        const favorite = await favoriteModel.findOneAndUpdate(
            { userId: "507f1f77bcf86cd799439011" },
            { $pull: { products: productId } },
            { new: true }
        );
        if (!favorite) return res.json({ status: "error", message: "favorite not found" });
        res.json({ status: "success", message: "product removed from favorites", data: favorite });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
}


export const favoritesController = {
    addToFavorites,
    getFavorites,
    removeFromFavorites
}