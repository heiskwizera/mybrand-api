import { Router } from 'express';
import { loginAttempt } from '../ controllers/LoginController.js';
const router = Router();

//Login endpoint
router.post('/', loginAttempt);

export const admin = router;