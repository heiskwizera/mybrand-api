import { Router } from 'express';
import { userCRUD } from '../ controllers/userController.js';
import { jwtauth } from '../middlewares/jwt_auth.js';
const router = Router();

// Creating a user
router.post('/', jwtauth,userCRUD.addUser);


// Getting all users
router.get('/', jwtauth,userCRUD.fetchUsers);

// Getting single user
router.get('/:id', jwtauth,userCRUD.fetchUser);


// Getting signed in user
router.get('./me',jwtauth,userCRUD.SignedUser)

// Updating user information
router.put('/:id',jwtauth,userCRUD.updateUser)

// Deleting a user
router.delete('/:id', jwtauth,userCRUD.deleteUser);

export const users = router;