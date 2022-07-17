const express = require("express");

const Food = require("./../models/food");

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: "./assets/images/food",

  filename: function (req, file, cb) {
    let name = req.body.name.replace(" ", "").toLowerCase();

    cb(null, name + "-" + Date.now() + path.extname(file.originalname));
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

    let food = new Food({
      title: data.title,
      content: data.content,
      image: file.filename,
    });

    await food.save();

    res.status(201).send({ message: "food saved !" });
  } catch (error) {
    res.status(400).send({ message: "food not saved !", error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    let food = await Food.find();


    res.status(200).send(food);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching foods !", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let foodId = req.params.id;

    let food = await Food.findOne({ _id: foodId });


    if (food) res.status(200).send(food);
    else res.status(404).send({ message: "food not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching food !", error: error });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    let foodId = req.params.id;
    let data = req.body;

    let food = await Food.findOneAndUpdate({ _id: foodId }, data);

    if (food) res.status(200).send({ message: "Food updated !" });
    else res.status(404).send({ message: "Food not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating food !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let foodId = req.params.id;

    let food = await Food.findOneAndDelete({ _id: foodId });

    if (food) res.status(200).send({ message: "Food deleted !" });
    else res.status(404).send({ message: "Food not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting Food !", error: error });
  }
});

module.exports = app;
