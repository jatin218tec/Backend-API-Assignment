const express = require("express");
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const { exec } = require('child_process');

router.post('/', verifyToken, (req, res) => {
    try {
        const video_file_path = req.body.video_file_path;
        const audio_file_path = req.body.audio_file_path;
        const unique_file_path = Date.now();
        const data = req.storageToken;

        exec(`ffmpeg -i ./${video_file_path} -i ./${audio_file_path} -c:v copy -c:a libvorbis -map 0:0 -map 1:0 ./public/${data}/video_${unique_file_path}.mp4`,
            (err, stdout, stderr) => {
                if (err) {
                    res.json({
                        "status": "bad",
                        "message": err
                    })
                } else {
                    res.json({
                        "status": "ok",
                        "message": "Video and Audio Merged Successfully",
                        "video_file_path": `./public/${data}/video_${unique_file_path}.mp4`
                    })

                }
            });

    } catch (error) {
        res.json({
            "status": "bad",
            "message": error
        })
    }
})

module.exports = router;