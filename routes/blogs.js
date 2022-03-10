import { Router } from 'express';
import { blogCRUD } from '../ controllers/blogsController.js';
import { jwtauth } from '../middlewares/jwt_auth.js';


const router = Router();

// Creating a blog
router.post('/', jwtauth, blogCRUD.addBlog);

// Getting all blogs
router.get('/', jwtauth,blogCRUD.fetchBlogs);

// Getting single blog
router.get('/:id', jwtauth,blogCRUD.fetchBlog);


// Updating a blog
router.put('/:id',jwtauth,blogCRUD.updateBlog)

// Deleting a blog
router.delete('/:id',jwtauth,blogCRUD.deleteBlog);

export const blogs = router;