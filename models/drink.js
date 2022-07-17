const mongoose = require("mongoose")

const drinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Drink = mongoose.model("drink", drinkSchema)

module.exports = Drink