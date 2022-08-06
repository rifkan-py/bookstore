import express from 'express';
import { signin, signup } from '../controllers/auth';
const router = express.Router();

router.route('/signin').post(signin).post(signup);

export default router;
