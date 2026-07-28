import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Adjust middleware paths if needed

const router = express.Router();

// Register the route
router.get('/stats', protect, admin, getAdminStats);

export default router;