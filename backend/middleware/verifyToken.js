const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.sendStatus(400);
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            req.userInfo = decoded;
            next();
        }
    });
}

module.exports = verifyToken;