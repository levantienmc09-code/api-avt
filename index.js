const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   ROUTE 1: API RANDOM AVATAR
   ========================= */
app.get("/api-avt", (req, res) => {
  const imgDir = path.join(__dirname, "Img");

  let files;
  try {
    files = fs.readdirSync(imgDir).filter(f =>
      /\.(png|jpg|jpeg|webp)$/i.test(f)
    );
  } catch (err) {
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

/* =========================
   ROUTE 2: WEB HIỂN THỊ ĐẸP
   ========================= */
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>API Random Avatar</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: #0f0f0f;
    color: #fff;
    font-family: Arial, sans-serif;
  }
  .wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    max-width: 90vw;
    max-height: 70vh;
    border-radius: 12px;
    box-shadow: 0 0 25px rgba(0,0,0,.7);
  }
  button {
    margin-top: 16px;
    padding: 10px 24px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="wrap">
    <h2>API Random Avatar</h2>
    <img id="avt" src="/api-avt">
    <button onclick="reload()">🔄 Random lại</button>
  </div>

<script>
function reload() {
  document.getElementById("avt").src =
    "/api-avt?t=" + Date.now();
}
</script>
</body>
</html>
  `);
});

/* =========================
   ROUTE 3: PING (CHỐNG SLEEP)
   ========================= */
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

/* =========================
   START SERVER
   ========================= */
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
