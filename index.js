const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// API random avatar tại /api-avt
app.get("/api-avt", (req, res) => {
  const imgDir = path.join(__dirname, "Img");

  let files;
  try {
    files = fs.readdirSync(imgDir).filter(f =>
      /\.(png|jpg|jpeg|webp)$/i.test(f)
    );
  } catch (e) {
    return res.status(500).send("Img folder not found");
  }

  if (files.length === 0) {
    return res.status(404).send("No avatar found");
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(imgDir, randomFile);

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.sendFile(filePath);
});

// test nhanh
app.get("/", (req, res) => {
  res.send(`
    <h3>API Random Avatar</h3>
    <img src="/api-avt" width="200">
    <p>Refresh để random</p>
  `);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
