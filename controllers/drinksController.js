const express = require("express");

const Drink = require("./../models/drink");

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: "./assets/images/drink",

  filename: function (req, file, cb) {
    let title = req.body.title.replace(" ", "").toLowerCase();

    cb(null, title + "-" + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype == true && extname == true) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
const app = express();

app.post("/", [upload.single("picture")], async (req, res) => {
  try {
    let data = req.body;
    let file = req.file;

    let drink = new Drink({
      title: data.title,
      content: data.content,
      image: file.filename,
    });

    await drink.save();

    res.status(201).send({ message: "drink saved !" });
  } catch (error) {
    res.status(400).send({ message: "drink not saved !", error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    let drink = await Drink.find();


    res.status(200).send(drink);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching drinks !", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let drinkId = req.params.id;

    let drink = await Drink.findOne({ _id: drinkId });


    if (drink) res.status(200).send(drink);
    else res.status(404).send({ message: "drink not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching drink !", error: error });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    let drinkId = req.params.id;
    let data = req.body;

    let drink = await Drink.findOneAndUpdate({ _id: drinkId }, data);

    if (drink) res.status(200).send({ message: "Drink updated !" });
    else res.status(404).send({ message: "Drink not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating drink !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let drinkId = req.params.id;

    let drink = await Drink.findOneAndDelete({ _id: drinkId });

    if (drink) res.status(200).send({ message: "Drink deleted !" });
    else res.status(404).send({ message: "Drink not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting drink !", error: error });
  }
});

module.exports = app;
