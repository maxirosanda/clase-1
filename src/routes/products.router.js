import { Router } from 'express';
import { productController } from '../controllers/products.controller.js';
import { isAuthenticated, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', isAuthenticated, productController.getProducts);
router.get('/:id', isAuthenticated, productController.getProductById);
router.post('/', isAuthenticated, authorize('admin'), productController.createProduct);
router.patch('/:id', isAuthenticated, authorize('admin'), productController.updateProduct);
router.delete('/:id', isAuthenticated, authorize('admin'), productController.deleteProduct);

export default router;
