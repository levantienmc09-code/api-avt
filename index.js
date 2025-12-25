app.get("/api-avt", (req, res) => {
  const imgDir = path.join(__dirname, "Img");
  const files = fs.readdirSync(imgDir).filter(f =>
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  );

  const randomFile = files[Math.floor(Math.random() * files.length)];
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(path.join(imgDir, randomFile));
});
