const Note = require('../models/NoteModel');
const User = require('../models/UserModel');

const getNotes = async(req, res) => {
    const userId = req.userInfo.id;
    if (!userId) return res.sendStatus(400);

    try {
        const notes = await Note.find({ user: userId });
        res.json(notes);

    } catch (error) {
        res.status(500).json(error)
    }
}

const addNote = async(req, res) => {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json('Please fill all fields');

    try {
        const user = await User.findOne({ _id: req.userInfo.id });
        if (!user) return res.status(400).json('invalid username');

        const newNote = new Note({
            title,
            body,
            user: user._id
        });

        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        res.status(500).json(error.message);
    }
}

const deleteNote = async(req, res) => {
    const userId = req.userInfo.id;
    const noteId = req.params.id;
    if (!userId) res.sendStatus(400);

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.sendStatus(400);
        }

        if (note.user.toString() !== userId) {
            return res.sendStatus(401);
        }

        await Note.deleteOne(note)
        res.json(note._id);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

const updateNote = async(req, res) => {
    const userId = req.userInfo.id;
    const noteId = req.params.id;
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(400).json('Please fill all fields');
    }

    try {
        const note = await Note.findById(noteId);

        if (!note) return res.sendStatus(400)

        if (note.user.toString() !== userId) {
            return res.sendStatus(401);
        }
        const favorite = req.body.favorite;
        const update = { title, body }
        if (favorite !== undefined) {
            update.favorite = favorite
        }
        await Note.findByIdAndUpdate(noteId, update);
        const updatedNote = await Note.findById(noteId);
        res.json(updatedNote);

    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    updateNote
}