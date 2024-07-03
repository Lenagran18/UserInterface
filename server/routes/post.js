const express = require("express");
const router = express.Router();
const Post = require("../models/post");


router

    .post('/createPost', async (req, res) => {
        try {
            const post = await Post.createPost(req.body.authorId, req.body.postContent);
            res.send({ ...post });
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/readPost', async (req, res) => {
        try {
            const post = await Post.readPost(req.body.postId, req.body.authorId);
            res.status(200).send({ ...post });
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .put('/updatePost', async (req, res) => {
        try {
            const post = await Post.updatePost(req.body.postId, req.body.authorId, req.body.newContent);
            res.status(200).send(post);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .delete('/deletePost', async (req, res) => {
        try {
            await Post.deletePost(req.body.postId, req.body.authorId);
            res.status(200).send({ success: "Post deleted" })
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    })

module.exports = router;