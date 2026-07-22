import { Router } from 'express';
import productModel from '../models/products.model.js';
import { requireAuthView } from '../middlewares/auth.middleware.js';
import { viewController } from '../controllers/view.controller.js';

const router = Router();

router.get('/', requireAuthView, viewController.home);
router.get('/cart', requireAuthView, viewController.cart);
router.get('/favorites', requireAuthView, viewController.favorites);
router.get('/register', viewController.register);
router.get('/login', viewController.login);

export default router;
