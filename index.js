// import libs
const express = require("express")
const cors = require("cors")

// import database connection
const mongoose = require("./config/db")


// creation d'un objet express .
const app = express()
const port = 3000

// import controllers

const messagesController = require("./controllers/messagesController")

const usersController = require("./controllers/usersController")

// autorisé les données de type JSON
app.use(express.json())
// autorisé les données de type files
app.use(express.urlencoded({
    extended: true
}));
// autorisé l'accee d'un serveur
app.use(cors())

// access to public files
app.use(express.static('./assets/images'));
app.use(express.static('./assets/images/users'));
app.use(express.static('./assets/images/trainers'));
app.use(express.static('./assets/images/trainings'));
app.use(express.static('./assets/images/categories'));

// router

app.use("/messages", messagesController)

app.use("/users", usersController)

// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })