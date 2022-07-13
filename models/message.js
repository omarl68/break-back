const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    email :{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
})

const Message = mongoose.model("message", messageSchema)

module.exports = Message