const express = require("express");
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const { exec } = require('child_process');
const fs = require("fs");


router.post('/', verifyToken, (req, res) => {
    try {
        let list = '';
        const data = req.storageToken;
        const list_file_path = `./public/${data}/list_${Date.now()}.txt`;
        const output_file_path = `./public/${data}/video_${Date.now()}.mp4`
        const videos = req.body.video_file_path_list;
        console.log(videos);
        videos.forEach(element => {
            list += `file ${element.split('/')[2]}`;
            list += '\n';
            const writeStream = fs.createWriteStream(list_file_path);
            writeStream.write(list);
            writeStream.end();
        });
        exec(`ffmpeg -safe 0 -f concat -i ${list_file_path} -c copy ${output_file_path}`,
            (err, stdout, stderr) => {
                if (err) {
                    res.json({
                        "status": "bad",
                        "message": err
                    })
                } else {
                    fs.unlinkSync(list_file_path);
                    res.json({
                        "status": "ok",
                        "message": "Merged All Video Successfully",
                        "video_file_path": output_file_path.split('/').slice(1).join('/'),
                    });
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