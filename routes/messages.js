import { Router } from 'express';
import { messageCRUD } from '../ controllers/messageController.js';
import { jwtauth } from '../middlewares/jwt_auth.js';
const router = Router();


// Creating a message
router.post('/', jwtauth,messageCRUD.addMessage);


// Getting all messages
router.get('/', jwtauth,messageCRUD.fetchMessages);

// Getting single message
router.get('/:id', jwtauth,messageCRUD.fetchMessage);


// Deleting a message
router.delete('/:id', jwtauth,messageCRUD.deleteMessage);

export const messages = router;