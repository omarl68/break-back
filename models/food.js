const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
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

const Food = mongoose.model("food", foodSchema)

module.exports = Food