import { Router } from 'express';
import { userCRUD } from '../ controllers/userController.js';
const router = Router();


// Creating a user
router.post('/', userCRUD.addUser);


// Getting all users
router.get('/', userCRUD.fetchUsers);

// Getting single user
router.get('/:id', userCRUD.fetchUser);


// Deleting a user
router.delete('/:id', userCRUD.deleteUser);

export const users = router;