import { Router } from "express";
import productsModel from "../models/products.model.js";
import { productController } from "../controllers/products.controller.js";

const router = Router()

router.get("/",productController.getProducts)
router.post("/",productController.createProduct)
router.patch("/:id",productController.updateProduct)
router.delete("/:id",productController.deleteProduct)

export default router