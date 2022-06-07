const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const connection = async() => {
    try {
        await mongoose.connect(DB_URI);
    } catch (error) {
        throw new Error(error);
        process.exit(1);
    }
}

module.exports = connection;