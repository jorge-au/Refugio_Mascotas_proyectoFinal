const jwt = require('jsonwebtoken')
// const jwtconfig = require('./jwtconfig');
 

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ msg: 'Access Denied' });

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' });
    }
};

module.exports = verifyToken;