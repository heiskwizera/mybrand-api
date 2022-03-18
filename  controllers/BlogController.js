import blogSchema from "../models/blogSchema.js";
import commentSchema from "../models/commentSchema.js";
// Create a blog
const addBlog = async (req, res) => {

    try {
        const post = await blogSchema.create({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        })
        res.status(201).json({
            response: `Here is your new created blog`,
            result: post
        })

    } catch (error) {
        res.status(400).json({
            response: `Error occured while trying to create a blog! ${error}`
        })
    }

}

// Getting all blogs
const fetchBlogs = async (req, res) => {
    const allPosts = await blogSchema.find({})
    res.status(201).json({
        response: "List of the blogs",
        blogs: allPosts
    })
}

// Getting single Blog document
const fetchBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogSchema.findById(blogId)
        const allComments = await commentSchema.find({ blogId: blogId });
        res.status(201).json({
            response: "View your blog",
            result: blog,
            comments: allComments
        })

    } catch (error) {
        res.status(404).json({
            response: `No post found ${error}`
        })
    }
}

// Updating single blog

const updateBlog = async (req, res) => {
    try {

        const blogId = req.params.id;
        const changes = await blogSchema.findByIdAndUpdate(blogId, req.body, { new: true });
        res.status(201).json({
            response: "Here is your updated blog",
            updated: changes
        })

    } catch (error) {
        res.status(400).json({
            response: `Cannot update post! ${error}`
        })
    }
}

// Deleting a blog

const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        await blogSchema.findByIdAndRemove(blogId)
        res.status(201).json({
            response: "Deleted a blog",
            blog: null
        })
    } catch (error) {
        res.status(400).json({
            response: `Failed to delete a blog! Error : ${error}`
        })
    }
}






export const blogCRUD = { addBlog, fetchBlog, fetchBlogs, updateBlog, deleteBlog }
