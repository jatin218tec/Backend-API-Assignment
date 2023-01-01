const jwt = require('jsonwebtoken');

const secKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next)=>{
    
    // Getting storage token from jwt token
    const token = req.header('auth-token');

    if (!token){
        res.status(401).send({error: 'token invalid'})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        return res.status(401).send({error: 'Please authenticate using a valid token'}) 
    }
}