const fs = require("fs").promises;
const moment = require("moment");
const path = require("path");
const multer = require("multer");
const express = require("express");
const Jimp = require("jimp");
const app = express();

const uploadDir = path.join(process.cwd(), "uploads");
const imageStore = path.join(process.cwd(), "images");

const isAcessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const createFolderIfItDoesntExist = async (folder) => {
  try {
    if (!(await isAcessible(folder))) {
      await fs.mkdir(folder);
    }
  } catch (e) {
    // sudo linux/WSL/macos/git cli
    // uruchom jako administrator (terminal)
    console.log("not enough permissions");
    process.exit(1);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${moment().format("HH:mm:ss:ms")}-${file.originalname}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(new Error("File is the wrong format"));
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 8 * 1024 * 16, // 16KB
    // 0|1 - bit
    // 1 bit
    // 8 bitów === Bajt
    // 1KB = 1000 * Bajt (8)
    // 1KiB = 1024 * Bajt
    // 1024KB = MB
    // 1024MB = 1GB
    // 1024GB = 1TB
    // 1024TB = 1PB - petabajt
    // 1TB
    // 1000 = KB
  },
});

const isImage = async (imagePath) =>
  new Promise((resolve) => {
    try {
      Jimp.read(imagePath, (err, image) => {
        // !! truthy => true
        // !! falsey => false
        // !!"1" => true
        // !!"0" => true
        // !!0 => false
        if (!!err) {
          resolve(false);
        } else {
          image.rotate(360).resize(256, 256).greyscale().write(imagePath);
          resolve(true);
        }
      });
    } catch (err) {
      resolve(false);
    }
  });

app.post(
  "/upload",
  uploadMiddleware.single("picture"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "There is no file" });
    }

    const { description } = req.body;
    const { path: temporaryName } = req.file;
    const fileName = path.join(imageStore, req.file.filename);

    try {
      await fs.rename(temporaryName, fileName);
    } catch (err) {
      await fs.unlink(temporaryName);
      return next(err);
    }

    // we do a proper check if it's a photo
    const isValid = await isImage(fileName);
    if (!isValid) {
      await fs.unlink(fileName);
      return res
        .status(400)
        .json({ message: "File isnt a photo but it's pretending" });
    }

    res.json({
      description,
      fileName,
      message: "File uploaded correctly",
      status: 200,
    });
  }
);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

app.listen(3000, async () => {
  await createFolderIfItDoesntExist(uploadDir);
  await createFolderIfItDoesntExist(imageStore);
  console.log("server is runnning");
});
