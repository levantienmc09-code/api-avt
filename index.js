const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// thư mục ảnh
const IMG_DIR = path.join(__dirname, "Img");

// =====================
// API RANDOM AVATAR (TRẢ ẢNH)
// =====================
app.get("/api-avt", (req, res) => {
  const files = fs.readdirSync(IMG_DIR).filter(f =>
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  );

  if (files.length === 0) {
    return res.status(404).send("No avatar found");
  }

  const randomImg = files[Math.floor(Math.random() * files.length)];
  const imgPath = path.join(IMG_DIR, randomImg);

  res.setHeader("Cache-Control", "no-store");
  res.sendFile(imgPath);
});

// =====================
// API RANDOM AVATAR (JSON)
// =====================
app.get("/api-avt-json", (req, res) => {
  res.json({
    url: `https://${req.headers.host}/api-avt?t=${Date.now()}`
  });
});

// =====================
// WEB GIAO DIỆN
// =====================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>API Random Avatar</title>
  <style>
    body {
      background:#111;
      color:#fff;
      font-family: Arial;
      text-align:center;
      padding-top:40px;
    }
    img {
      max-width:280px;
      border-radius:12px;
      box-shadow:0 0 10px #000;
    }
    button {
      margin-top:15px;
      padding:10px 20px;
      border:none;
      border-radius:6px;
      cursor:pointer;
      font-size:16px;
    }
  </style>
</head>
<body>
  <h2>API Random Avatar</h2>
  <img id="avt" src="/api-avt?t=${Date.now()}"><br>
  <button onclick="random()">Refresh để random</button>

  <script>
    function random() {
      document.getElementById("avt").src =
        "/api-avt?t=" + Date.now();
    }
  </script>
</body>
</html>
`);
});

// =====================
// PING ROUTE (CHỐNG SLEEP)
// =====================
app.get("/ping", (req, res) => {
  res.send("pong");
});

// =====================
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
