import { Router } from 'express';
import { postComment } from '../ controllers/CommentController.js';
import { auth } from '../middlewares/jwt_auth.js';

const router = Router();


// Creating a comment
router.post('/:id/create', auth, postComment.addComment);

// fetch comments
router.get('/:id/view', postComment.fetchComments)

// delete comment
router.delete('/:id/delete', auth, postComment.deleteComment)


export const comments = router;