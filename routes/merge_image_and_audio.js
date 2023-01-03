const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const videoshow = require('videoshow');

router.post('/', verifyToken, (req, res) => {
    try {
        const image = [`./${req.body.image_file_path}`]
        const videoOptions = {
            fps: 25,
            loop: 5, // seconds
            transition: false,
            transitionDuration: 1, // seconds
            videoBitrate: 1024,
            videoCodec: 'libx264',
            size: '640x?',
            audioBitrate: '128k',
            audioChannels: 2,
            format: 'mp4',
            pixelFormat: 'yuv420p'
        }
        const unique_file_name = Date.now();
        const data = req.storageToken;
        videoshow(image, videoOptions)
            .audio(`./${req.body.audio_file_path}`)
            .save(`./public/${data}/video_${unique_file_name}.mp4`)
            .on('start', function (command) {
                console.log('ffmpeg process started:', command)
            })
            .on('error', function (err, stdout, stderr) {
                res.json({
                    "status": "bad",
                    "message": err,
                    "ffmpeg-stderr": stderr
                })
            })
            .on('end', function (output) {
                res.json({
                    "status": "ok",
                    "message": "Video Created Successfully",
                    path: `pulbic/${data}/video_${unique_file_name}.mp4`,
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