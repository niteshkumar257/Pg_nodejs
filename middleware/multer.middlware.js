// multer

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where you want to store the uploaded files
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Use a unique filename for each uploaded file
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export { upload };
