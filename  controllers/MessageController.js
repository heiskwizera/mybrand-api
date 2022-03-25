import messageSchema from "../models/messageSchema.js";

// Create a message
const addMessage = async (req, res) => {
    try {
        const message = await messageSchema.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            response: req.body.message
        })
        res.status(201).json({
            response: "New message is added",
            result: message
        })

    } catch (error) {
        res.status(500).json({
            response: `Error : ${error}`
        })
    }
}

// Getting all messages
const fetchMessages = async (req, res) => {
    try {
        const allMessages = await messageSchema.find({})
        res.status(201).json({
            response: "Messages retrieved",
            messages: allMessages
        })
    } catch (error) {
        res.status(400).json({
            response: `Bad request! Error : ${error}`
        })
    }
}

// Getting single message

const fetchMessage = async (req, res) => {
    try {
        const MessageId = req.params.id;
        const Message = await messageSchema.findById(MessageId)
        res.status(201).json({
            response: "Message retrieved",
            messages: Message
        })
    } catch (error) {
        res.status(400).json({
            response: `🚫 No record found`
        })
    }
}

// Deleting a message
const deleteMessage = async (req, res) => {
    try {
        const MessageId = req.params.id;
        await messageSchema.findByIdAndRemove(MessageId)
        res.status(201).json({
            response: "Deleted a Message"
        })
    } catch (error) {
        res.status(400).json({
            response: error
        })
    }
}

export const messageCRUD = { addMessage, fetchMessage, fetchMessages, deleteMessage }