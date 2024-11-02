import express from 'express'
import {signup, login, userDetails} from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-details', authMiddleware, userDetails);

export default router;