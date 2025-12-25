app.get("/api-avt-json", (req, res) => {
  const fs = require("fs");
  const path = require("path");

  const imgDir = path.join(__dirname, "Img");
  const files = fs.readdirSync(imgDir).filter(f =>
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  );

  const randomFile = files[Math.floor(Math.random() * files.length)];

  res.json({
    url: `https://${req.headers.host}/api-avt?t=${Date.now()}`
  });
});
