const mongoose = require("mongoose");
//Schema
const commentSchema = new mongoose.Schema({
    commentContent: { type: String, required: true },
    date: { type: Date, default: Date.now },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

//Model
const Comment = mongoose.model('Comment', commentSchema); 

//Functions
//CREATE

async function createComment(authorId, postId, commentContent) {
    const newComment = await Comment.create({
        authorId: authorId, 
        postId: postId, 
        commentContent: commentContent
    });
    return newComment
}

//READ
async function readComment(authorId, postId, commentId) {
    const comment = await Comment.findOne({ 
        authorId: authorId,
        postId: postId,
        "_id": commentId
    });
    if(!comment) {
        throw new Error("Unable to find comment");
    }
    return comment;
}

//UPDATE
async function updateComment(authorId, postId, commentId, newContent) {
    const comment = await Comment.findOneAndUpdate( 
        { '_id': commentId, authorId: authorId, postId: postId },
        { commentContent: newContent, date: new Date() }, 
        { new: true }
    );

    if(!comment) {
        throw new Error("Cannot update comment")
    }
    return comment;
}

//DESTROY
async function deleteComment(authorId, postId, commentId) {
    const comment = await Comment.findOne({ 
        _id: commentId, 
        authorId: authorId, 
        postId: postId
    });
    if(!comment) {
        throw new Error("Unable to delete post")
    }
    await Comment.deleteOne({_id: commentId});
}

module.exports = { Comment, createComment, readComment, updateComment, deleteComment }