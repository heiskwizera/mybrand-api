import { Router } from 'express';
import { messageCRUD } from '../ controllers/MessageController.js';
import { auth } from '../middlewares/jwt_auth.js';
import { admin } from '../middlewares/admin.js';

const router = Router();


// Creating a message
router.post('/create', auth, messageCRUD.addMessage);

// Getting all messages
router.get('/all', [auth, admin], messageCRUD.fetchMessages);

// Getting single message
router.get('/view/:id', [auth, admin], messageCRUD.fetchMessage);

// Deleting a message
router.delete('/delete/:id', [auth, admin], messageCRUD.deleteMessage);

export const messages = router;