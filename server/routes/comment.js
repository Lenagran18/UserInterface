const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router

    .post('/createComment', async (req, res) => {
        try {
            const comment = await Comment.createComment(req.body.authorId, req.body.postId, req.body.commentContent);
            res.status(200).send({ ...comment });
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/readComment', async (req, res) => {
        try {
            const comment = await Comment.readComment(req.body.authorId, req.body.postId, req.body.commentId);
            res.status(200).send({ ...comment });
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .put('/updateComment', async (req, res) => {
        try {
            const comment = await Comment.updateComment(req.body.authorId, req.body.postId, req.body.commentId, req.body.newContent);
            res.status(200).send(comment);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .delete('/deleteComment', async (req, res) => {
        try {
            await Comment.deleteComment(req.body.authorId, req.body.postId, req.body.commentId);
            res.status(200).send({ success: "Post deleted" });
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

module.exports = router;