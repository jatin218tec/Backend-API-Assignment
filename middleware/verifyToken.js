const jwt = require('jsonwebtoken');

const secKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {

    try {
        // Getting storage token from jwt token
        const cookie = req.headers.cookie;
        // console.log(cookie);
        const data = jwt.verify(cookie, secKey);
        req.storageToken = data;
        next();
    } catch (error) {
        return res.status(401).send({ error });
    }

}

module.exports = verifyToken;