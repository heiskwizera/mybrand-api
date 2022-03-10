import blogSchema from "../models/blogSchema.js";

// Create a blog
const addBlog = async (req, res) => {

    try {
        const post = await blogSchema.create({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        })
        res.status(200).json({
            message: `Here is your new created blog`,
            result: post
        })

    } catch (error) {
        res.status(401).json({
            message: `Error occured while trying to create a blog! ${error}`
        })
    }

}

// Getting all blogs
const fetchBlogs = async (req, res) => {
    try {
        const allPosts = await blogSchema.find({})
        res.status(200).json({
            message: "List of the blogs",
            blogs: allPosts
        })
    } catch (error) {
        res.status(400).json({
            message: `Failed to retrieve posts! ${error}`
        })

    }
}

// Getting single Blog document
const fetchBlog = async (req, res) => {
    try {

        const blogId = req.params.id;
        const blog = await blogSchema.findById(blogId)
        res.status(200).json({
            message: "View your blog",
            result: blog
        })

    } catch (error) {
        res.status(400).json({
            message: `Cannot view your post! ${error}`
        })
    }
}

// Updating single blog

const updateBlog = async (req, res) => {
    try {

        const blogId = req.params.id;
        const changes = await blogSchema.findByIdAndUpdate(blogId, req.body, { new: true });
        res.status(200).json({
            message: "Here is your updated blog",
            updated : changes
        })

    } catch (error) {
        res.status(400).json({
            message: `Cannot update post! ${error}`
        })
    }
}

// Deleting a blog

const deleteBlog = async(req,res)=>{
    try {
        const blogId = req.params.id;
        await blogSchema.findByIdAndRemove(blogId)
        res.status(200).json({
            message:"Deleted a blog",
            blog : null
        })
    } catch (error) {
        res.status(400).json({
            message:`Failed to delete a blog! Error : ${error}`
        })
    }
}
export const blogCRUD = {addBlog, fetchBlog, fetchBlogs,updateBlog,deleteBlog}
