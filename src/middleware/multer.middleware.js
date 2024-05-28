import multer from "multer";
import path from "path";

const imagesFolderPath = path.join(path.resolve(), "src", "uploads");
console.log({ imagesFolderPath });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesFolderPath);
  },
  filename: (req, file, cb) => {
    const fileName =
      new Date().toISOString().replace(/:/g, "_") + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
export default upload;
