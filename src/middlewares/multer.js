import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination folder of the file in the server
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
