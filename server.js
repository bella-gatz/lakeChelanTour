const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const galleryPath = path.join(__dirname, "public/images/gallery");

app.use(express.static("public"));

// API endpoint to get folder to photos mapping
app.get("/gallery", (req, res) => {
  const folders = fs.readdirSync(galleryPath);
  const gallery = {};

  folders.forEach(folder => {
    const folderPath = path.join(galleryPath, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
      gallery[folder] = fs.readdirSync(folderPath).filter(file =>
        /\.(jpg|jpeg|png|gif)$/i.test(file)
      );
    }
  });

  res.json(gallery);
});

app.listen(3000, () => console.log("Gallery server running on http://localhost:3000"));
