// import libs
const express = require("express")
const cors = require("cors")

// import database connection
const mongoose = require("./config/db")


// creation d'un objet express .
const app = express()
const port = 3000

// import controllers
const cofesController = require("./controllers/cofesContorller")
const drinksController = require("./controllers/drinksController")
const messagesController = require("./controllers/messagesController")
const foodsController = require("./controllers/foodsController")
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
app.use(express.static('./assets/images/drink'));
app.use(express.static('./assets/images/food'));
app.use(express.static('./assets/images/cofe'));

// router
app.use("/cofes", cofesController)
app.use("/drinks", drinksController)
app.use("/messages", messagesController)
app.use("/foods", foodsController)
app.use("/users", usersController)

// create server
app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })