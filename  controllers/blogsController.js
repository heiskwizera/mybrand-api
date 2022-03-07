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
            message: "New blog is added",
            result: post
        })

    } catch (error) {
        res.status(500).json({
            message: "error"
        })
    }

}

// Getting all blogs
const fetchBlogs = async (req, res) => {
    try {
        const allPosts = await blogSchema.find({})
        res.status(200).json({
            message: "Retrieved the blogs",
            blogs: allPosts
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed"
        })

    }
}

// Getting single Blog document
const fetchBlog = async (req, res) => {
    try {

        const blogId = req.params.id;
        const blog = await blogSchema.findById(blogId)
        res.status(200).json({
            message: "Retrieved a blog",
            result: blog
        })

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

// Updating single blog

const updateBlog = async (req, res) => {
    try {

        const blogId = req.params.id;
        const changes = await blogSchema.findByIdAndUpdate(blogId, req.body, { new: true });
        res.status(200).json({
            message: "Updated blog"
        })

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

// Deleting a blog

const deleteBlog = async(req,res)=>{
    try {
        const blogId = req.params.id;
        await blogSchema.findByIdAndRemove(blogId)
        res.status(200).json({
            message:"Deleted a blog"
        })
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}
export const blogCRUD = {addBlog, fetchBlog, fetchBlogs,updateBlog,deleteBlog}
