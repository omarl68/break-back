const mongoose = require("mongoose")

const cofeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Cofe = mongoose.model("cofe", cofeSchema)

module.exports = Cofe