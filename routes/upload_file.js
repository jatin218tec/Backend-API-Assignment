const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');
const fs = require("fs-extra");

const storage = multer.diskStorage({
    destination: `./public/temp`,
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
});

router.post('/', verifyToken, upload.single('media'), async (req, res) => {
    const data = req.storageToken;
    try {
        const filename = req.file.filename;
        fs.move(`./public/temp/${filename}`, `./public/${data}/${filename}`, (err) => {
            if (err) {
                res.json({
                    status: 500,
                    message: err
                })
            }
            res.json({
                "status": "ok",
                "file_path": `public/${data}/${filename}`
            });
        })
    } catch (error) {
        res.json({
            "status": "bad",
            "message": error
        });
    }
})

module.exports = router;