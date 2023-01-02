const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require("fs");
const uuid = require('uuid');
require('dotenv').config();

const secKey = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const uniqueId = uuid.v4();
    try {
        fs.mkdir(`./public/${uniqueId}`, function (err) {
            if (err) {
                res.json({
                    "status": "Internal Server Error",
                    "message": err,
                });
            } else {
                const storageToken = jwt.sign(uniqueId, secKey);
                res.cookie('storageToken', storageToken, { maxAge: 900000, httpOnly: true });
                res.json({
                    "status": "ok",
                    "message": "Storage Created Successfully",
                });
            }
        })
    } catch (error) {
        res.json({
            "status": "bad",
            "message": error,
        });
    }
})

module.exports = router;