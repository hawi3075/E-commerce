import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Matches POST /api/auth/register OR POST /api/users/register
router.post('/register', registerUser);
router.post('/login', loginUser);

// Fallback direct root route if frontend posts directly to /api/users
router.post('/', registerUser);

export default router;