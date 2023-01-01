const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require("fs");
const uuid = require('uuid');
require('dotenv').config();

const secKey = process.env.JWT_SECRET;

router.get('/', async (req, res) => {

    const uniqueId = uuid.v4();

    fs.mkdir(`./public/${uniqueId}`, function (err) {
        if (err) {
            res.json({
                "status": "Internal Server Error",
                "message": err,
            });
        } else {
            const storageToken = jwt.sign(100, secKey);
            res.cookie('storageToken', storageToken, { maxAge: 900000, httpOnly: true });
            res.json({
                "status": "ok",
                "message": "Storage Created Successfully",
            });
        }
    })
})

module.exports = router;