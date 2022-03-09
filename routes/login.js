import {Router} from 'express';
import { loginAttempt } from '../ controllers/loginController.js';
const router = Router();

//Login endpoint
router.post('/',loginAttempt);

export const admin = router;