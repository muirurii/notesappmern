const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({ message: 'Please fill in all required fields' });

    try {
        const duplicate = await checkDuplicate(username);

        if (duplicate !== null) {
            return res.status(409).json({ message: "username is not available" });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPwd
        });
        const user = await newUser.save();
        const accessToken = jwt.sign({ username, id: newUser._id.toString() }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            message: 'success',
            username: user.username,
            email: email,
            accessToken
        });

    } catch (error) {
        res.status(400).json(error.message);
    }

}
const checkDuplicate = async(username) => {
    const duplicate = await User.findOne({ username });
    return duplicate;
}

const loginUser = async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Please fill in all fields' });

    try {
        const userInDB = await User.findOne({ username });
        if (!userInDB) return res.status(400).json({ message: 'Wrong credentials' });

        const verifyPassword = await bcrypt.compare(password, userInDB.password);
        if (!verifyPassword) return res.status(400).json({ message: 'Wrong credentials' });

        const accessToken = jwt.sign({ username, id: userInDB._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
        res.json({ username, email: userInDB.email, message: 'logged in', accessToken });

    } catch (error) {
        res.sendStatus(500);
    }
}

const getUser = async(req, res) => {
    const userId = req.userInfo.id;
    if (!userId) return res.sendStatus(500);

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Not found' });

        res.json({
            username: user.username,
            email: user.email,
            id: user._id
        });
    } catch (error) {
        res.sendStatus(500);
    }

}

const updateUser = async(req, res) => {
    const requestedUsername = req.params.username;

    try {
        const user = await User.findOne({ username: requestedUsername });
        if (!user) return res.json({ message: 'username not found' });
        const { newUsername, newEmail } = req.body;

        if (!newUsername || !newEmail) return res.status(400).json('Please fill in all required fields');
        const duplicate = await checkDuplicate(newUsername);
        if (duplicate && requestedUsername !== duplicate.username) return res.status(409).json({ message: 'username is not available' });

        const newData = {
            username: newUsername,
            email: newEmail
        }

        await User.findOneAndUpdate({ username: requestedUsername }, newData);
        const updatedUser = await User.findOne({ username: newUsername });
        const accessToken = jwt.sign({ username: updatedUser.username, id: updatedUser._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });

        res.json({
            username: updatedUser.username,
            email: updatedUser.email,
            message: 'updated',
            accessToken
        });
    } catch (error) {
        res.sendStatus(500);
    }

}

const deleteUser = async(req, res) => {

    try {
        const username = req.params.username;
        if (!username) return res.sendStatus(204);

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'user not found' });

        await user.remove();
        res.sendStatus(204);

    } catch (error) {
        res.sendStatus(500);
    }

}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
}