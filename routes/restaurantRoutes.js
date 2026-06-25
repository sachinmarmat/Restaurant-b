import express from 'express';
import { getRestaurant, updateRestaurant, resetRestaurant } from '../controllers/restaurantController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRestaurant);
router.put('/', requireAdmin, updateRestaurant);
router.post('/reset', requireAdmin, resetRestaurant);

export default router;
