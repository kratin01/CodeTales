import express from 'express';
import { login, register, me } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', auth, me);

export default authRouter;

