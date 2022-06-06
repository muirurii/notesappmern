const errorHandler = (err, req, res, next) => {
    res.status(500).json({ mesage: err.message });
    next();
}

module.exports = errorHandler;