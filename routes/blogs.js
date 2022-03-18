import { Router } from 'express';
import { blogCRUD } from '../ controllers/BlogController.js';
import { auth } from '../middlewares/jwt_auth.js';
import { admin } from '../middlewares/admin.js';


const router = Router();

// Creating a blog
router.post('/create', [auth, admin], blogCRUD.addBlog);

// Getting all blogs
router.get('/all', blogCRUD.fetchBlogs);

// Getting single blog
router.get('/view/:id', blogCRUD.fetchBlog);

// Updating a blog
router.put('/update/:id', [auth, admin], blogCRUD.updateBlog)

// Deleting a blog
router.delete('/delete/:id', [auth, admin], blogCRUD.deleteBlog);

export const blogs = router;