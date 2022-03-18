import { Router } from 'express';
import { userCRUD } from '../ controllers/UserController.js';
import { auth } from '../middlewares/jwt_auth.js';
import { admin } from '../middlewares/admin.js';

const router = Router();

// Creating a user
router.post('/create', userCRUD.addUser);


// Getting all users
router.get('/all', auth, userCRUD.fetchUsers);

// Getting single user
router.get('/view/:id', [auth, admin], userCRUD.fetchUser);


// Getting signed in user
router.get('/me', auth, userCRUD.SignedUser)

// Updating user information
router.put('/update/:id', [auth, admin], userCRUD.updateUser)

// Deleting a user
router.delete('/delete/:id', [auth, admin], userCRUD.deleteUser);



export const users = router;