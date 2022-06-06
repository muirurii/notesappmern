const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json('Please fill in all required fields');

    try {
        const duplicate = await User.findOne({ username });

        if (duplicate !== null) {
            return res.status(400).json({ message: "username not available " });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPwd
        });
        const user = await newUser.save();

        res.status(201).json({
            message: 'success',
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json(error.message);
    }

}

const loginUser = async(req, res) => {

    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);

    try {
        const userInDB = await User.findOne({ username });

        if (!userInDB) return res.status(400).json({ message: 'wrong credentials' });

        const verifyPassword = await bcrypt.compare(password, userInDB.password);

        if (!verifyPassword) return res.status(403).json({ message: 'wrong credentials' });

        const accessToken = jwt.sign({ username, id: userInDB._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });

        res.json({ message: 'logged in', accessToken });

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

        //Find if new username is available

        if (!newUsername || !newEmail) return res.status(400).json('Please fill in all required fields');

        const duplicate = await User.findOne({ username: newUsername });

        if (duplicate) return res.sendStatus(204);

        //Update
        const newData = {
            username: newUsername,
            email: newEmail
        }

        await User.findOneAndUpdate({ username: requestedUsername }, newData);

        const updatedUser = await User.findOne({ username: newUsername });
        res.json(updatedUser);

    } catch (error) {
        res.sendStatus(500);
    }

}

const deleteUser = async(req, res) => {

    try {
        const username = req.params.username;
        if (!username) return res.sendStatus(204);

        const user = await User.findOne({ username });
        if (!user) return res.sendStatus(204);

        await user.remove();
        res.json(username);

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