const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mediavault")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Model
const MediaSchema = new mongoose.Schema({
  name: String,
  type: String,
  data: String
});

const Media = mongoose.model("Media", MediaSchema);

// Upload Route (No Multer Needed)
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

// Get Media
app.get("/media", async (req, res) => {
  const data = await Media.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});