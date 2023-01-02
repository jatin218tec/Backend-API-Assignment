const express = require("express");
const router = express.Router();
const gTTS = require('gtts');
const fs = require('fs');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {

    try {
        const path = req.body.file_path;

        fs.readFile(`./${path}`, 'utf8', function (err, text) {
            const gtts = new gTTS(text, 'en');
            const data = req.storageToken;
            const unique_file_name = Date.now();

            gtts.save(`./public/${data}/Voice_${unique_file_name}.mp3`, function (err, result) {
                res.json({
                    "status": "ok",
                    "message": "text to speech converted",
                    "audio_file_path": `./public/${data}/Voice_${unique_file_name}.mp3`
                })
            });
            
        });
    } catch (error) {
        if (err) {
            res.json({
                status: 'bad',
                message: err
            })
        };
    }
})

module.exports = router