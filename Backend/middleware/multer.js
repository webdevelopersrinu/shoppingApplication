import multer from "multer";
const storage = multer.diskStorage({
  filename: function (req, flie, callback) {
    callback(null, flie.originalname);
  },
});

const upload = multer({ storage });

export default upload;
