const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    postContent: { type: String, required: true },
    postLikes: { type: Number, default: 0 },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const Post = mongoose.model('Post', postSchema);

// CREATE a post
async function createPost(authorId, postContent) {
    const newPost = await Post.create({
        postContent: postContent,
        authorId: authorId
    });
    return newPost;
}

//READ - 

async function readPost(postId, authorId) {
    const post = await Post.findOne({_id: postId, authorId: authorId });
    if(!post) {
        throw new Error("Unable to find post");
    }
    return post;
}

//UPDATE - update content
async function updatePost(postId, authorId, newContent) {
    const post = await Post.findOneAndUpdate(
        { '_id': postId, authorId: authorId },
        { postContent: newContent, date: new Date() }, 
        {new: true} 
        );
    
    if(!post) {
        throw Error("Cannot update post");
    }
    return post;
}


//DESTROY - delete post
async function deletePost(postId) {
    const post = await Post.findOne({ _id: postId, authorId: authorId });
    if(!post) {
        throw new Error("Unable to delete post")
    }
    await Post.deleteOne({ _id: postId });
}

module.exports = { Post, createPost, readPost, updatePost, deletePost};