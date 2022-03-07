import { Router } from 'express';
import { messageCRUD } from '../ controllers/messageController.js';
const router = Router();


// Creating a message
router.post('/', messageCRUD.addMessage);


// Getting all messages
router.get('/', messageCRUD.fetchMessages);

// Getting single message
router.get('/:id', messageCRUD.fetchMessage);


// Deleting a message
router.delete('/:id', messageCRUD.deleteMessage);

export const messages = router;