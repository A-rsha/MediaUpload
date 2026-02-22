const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


const MediaSchema = new mongoose.Schema({
  name: String,
  type: String,
  data: String
});

const Media = mongoose.model("Media", MediaSchema);

app.post("/upload", async (req, res) => {
  try {
    const { name, type, data } = req.body;

    const newMedia = new Media({
      name,
      type,
      data
    });

    await newMedia.save();
    res.json({ message: "Upload Success" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/media", async (req, res) => {
  const data = await Media.find();
  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});