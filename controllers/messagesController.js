const express = require("express")

const Message = require('./../models/message')

const app = express()

app.post('/', async (req, res) => {
    try {
        let data = req.body
        let messages = new Message({
            sender: data.sender,
            email:data.email,
            title: data.title,
            content: data.content,
        })
        await messages.save()
        res.status(201).send({ message: "message saved !" })

    } catch (error) {
        res.status(400).send({ message: "add message faild !" })
    }
})


app.get('/', async (req, res) => {
    try {
        let messages = await Message.find()
        res.status(200).send(messages)
    } catch (error) {
        res.status(400).send({ message: "Error fetching messages !", error: error })
    }
})

app.get('/:id', async (req, res) => {
    try {
        let messagesId = req.params.id

        let messages = await Message.findOne({ _id: messagesId })

        if (messages)
            res.status(200).send(messages)
        else
            res.status(404).send({ message: "message not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error fetching message !", error: error })
    }
})

app.patch('/:id', async (req, res) => {
    try {
        let messagesId = req.params.id
        let data = req.body

        let messages = await Message.findOneAndUpdate({ _id: messagesId }, data)

        if (messages)
            res.status(200).send({ message: "Messages updated !" })
        else
            res.status(404).send({ message: "Messages not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error updating Training !", error: error })
    }

})

app.delete('/:id', async (req, res) => {
    try {
        let messagesId = req.params.id

        let messages = await messages.findOneAndDelete({ _id: messagesId })

        if (messages)
            res.status(200).send({ message: "messages deleted !" })
        else
            res.status(404).send({ message: "Messages not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error deleting messages !", error: error })
    }
})

module.exports = app