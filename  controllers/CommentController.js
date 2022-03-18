import commentSchema from '../models/commentSchema.js';
import blogSchema from '../models/blogSchema.js';

// Add Skill
const addComment = async (req, res) => {
    try {
        // Find blog associated with id
        const blogId = req.params.id;
        const isFound = await blogSchema.findById(blogId);

        if (isFound == "") return res.status(400).json({
            response: "Bad request!"
        });
        const comment = await commentSchema.create({
            blogId: blogId,
            author: req.user.name,
            comment: req.body.comment
        })
        res.status(201).json({
            response: `${req.body.author} Has added new comment `,
            result: comment
        })

    } catch (error) {
        res.status(500).json({
            response: `Error : ${error} ${req.user.name}`
        })
    }

}

// Getting all comments
const fetchComments = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogSchema.findById(id);
        const allComments = await commentSchema.find({ blogId: id });
        res.status(201).json({
            response: "comments",
            comments: allComments
        })
    } catch (error) {
        res.status(400).json({
            response: `Error : ${error}`
        })
    }
}


const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        await commentSchema.findByIdAndRemove(commentId)
        res.status(201).json({
            response: "Deleted a comment",
            comment: null
        })
    } catch (error) {
        res.status(400).json({
            response: `Failed to delete a comment! Error : ${error}`
        })
    }
}

export const postComment = { addComment, fetchComments, deleteComment };
