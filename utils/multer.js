const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

// File filter to allow only specific file types
const fileFilter = (_req, file, cb) => {
    const validFile = ["image/png", "image/jpeg", "image/pdf", "image/jpg"];
    if (validFile.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });
const deleteImage = async (image) => {
    const filePath = path.join(__dirname, "../uploads", path.basename(image));
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("File deleted successfully");
                }
            });
        }
    });
};

module.exports = { upload, deleteImage };
