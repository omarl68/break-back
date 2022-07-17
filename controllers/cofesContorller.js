const express = require("express");

const Cofe = require("./../models/cafes");

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: "./assets/images/cofe",

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

app.post("/", [upload.single("picture")],  async (req, res) => {
  try {
    let data = req.body;
   
    let file = req.file;
    let cofe = new Cofe({
      title: data.title,
      content: data.content,
      image: file.filename,
    });

    await cofe.save();

    res.status(201).send({ message: "cofe saved !" });
  } catch (error) {
    res.status(400).send({ message: "cofe not saved !", error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    let cofe = await Cofe.find();


    res.status(200).send(cofe);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching cofes !", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let cofeId = req.params.id;

    let cofe = await Cofe.findOne({ _id: cofeId });


    if (cofe) res.status(200).send(cofe);
    else res.status(404).send({ message: "cofe not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching cofe !", error: error });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    let cofeId = req.params.id;
    let data = req.body;

    let cofe = await Cofe.findOneAndUpdate({ _id: cofeId }, data);

    if (cofe) res.status(200).send({ message: "cofe updated !" });
    else res.status(404).send({ message: "cofe not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating cofe !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let cofeId = req.params.id;

    let cofe = await Cofe.findOneAndDelete({ _id: cofeId });

    if (cofe) res.status(200).send({ message: "cofe deleted !" });
    else res.status(404).send({ message: "cofe not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting cofe !", error: error });
  }
});

module.exports = app;
