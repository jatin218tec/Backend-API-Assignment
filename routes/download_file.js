const express = require("express");
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, (req, res) => {
    try {
        const file_path = req.body.file_path;
        res.download(`./${file_path}`, (error) => {
            res.json({
                "status": "bad",
                "message": error
            })
        })
    } catch (error) {
        res.json({
            "status": "bad",
            "message": error
        })
    }
})

module.exports = router;