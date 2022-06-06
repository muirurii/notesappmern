const Post = require('../model/postModel');
const User = require('../model/userModel');

const getPosts = async(req, res) => {
    const userId = req.userInfo.id;
    if (!userId) return res.sendStatus(400);

    try {
        const posts = await Post.find({ user: userId });
        res.json(posts);

    } catch (error) {
        res.status(500).json(error)
    }

}

const addPost = async(req, res) => {

    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json('Please fill all fields');

    try {
        const user = await User.findOne({ _id: req.userInfo.id });

        if (!user) return res.status(400).json('invalid username');

        const newPost = new Post({
            title,
            body,
            user: user._id
        });

        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

const deletePost = async(req, res) => {
    const userId = req.userInfo.id;
    const postId = req.params.id;

    if (!userId) res.sendStatus(400);

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.sendStatus(400);
        }

        if (post.user.toString() !== userId) {
            return res.sendStatus(401);
        }

        await Post.deleteOne(post)
        res.json(post._id);

    } catch (error) {
        res.status(500).json(error.message);
    }

}

const updatePost = async(req, res) => {
    const userId = req.userInfo.id;
    const postId = req.params.id;
    const { title, body } = req.body;
    if (!title || !body) {
        res.status(400).json('Please fill all fields');
    }

    try {
        const post = await Post.findById(postId);

        if (!post) return res.sendStatus(400)

        if (post.user.toString() !== userId) {
            return res.sendStatus(401);
        }
        const update = await Post.findByIdAndUpdate(postId, { title, body });
        const updatedPost = await Post.findById(postId);
        res.json(updatedPost);

    } catch (error) {
        res.status(500).json(error.message);
    }


}

module.exports = {
    getPosts,
    addPost,
    deletePost,
    updatePost
}