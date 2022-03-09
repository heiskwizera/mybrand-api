import { Router } from 'express';
import { blogCRUD } from '../ controllers/blogsController.js';
// import { jwtauth } from '../middlewares/jwt_auth.js';


const router = Router();

// Creating a blog
router.post('/', blogCRUD.addBlog);

// Getting all blogs
router.get('/', blogCRUD.fetchBlogs);

// Getting single blog
router.get('/:id', blogCRUD.fetchBlog);


// Updating a blog
router.put('/:id',blogCRUD.updateBlog)

// Deleting a blog
router.delete('/:id',blogCRUD.deleteBlog);

export const blogs = router;