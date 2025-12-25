const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const IMG_DIR = path.join(__dirname, "Img");

app.get("/", (req, res) => {
  const files = fs.readdirSync(IMG_DIR).filter(f =>
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  );

  if (!files.length) return res.status(404).end();

  const randomImg = files[Math.floor(Math.random() * files.length)];
  const imgPath = path.join(IMG_DIR, randomImg);

  // chống cache
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.sendFile(imgPath);
});

// ping chống sleep (Render)
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
