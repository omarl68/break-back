const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    image: {
        type: String,
   
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipe: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "client"
    },
})

const User = mongoose.model("user", userSchema)

module.exports = User