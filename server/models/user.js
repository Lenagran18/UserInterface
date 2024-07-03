//CRUD OPERATIONS - creating schema for user entity
const bcrypt = require('bcryptjs'); //import bcrypt
const mongoose = require("mongoose"); // import mongoose

//create schema 
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true }, // so that you need a unique username and password 
    email: { type: String, required: true },
    password: { type: String, required: true },
    followers: [String],
    following: [String]
});

// create model of schema 
const User = mongoose.model("User", userSchema);

// create CRUD functions on model 

// CREATE a user - register 
async function register(username, email, password) {
    const user = await getUser(username);
    if (user) throw Error("Username already in use"); // if username is in use, throw an error

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username, // value is pulling from parameters
        email: email,
        password: hashed
    });

    return newUser._doc;
};


//READ a user - login 
async function login(username, password) { // async before function, await whenever using mongoose function 
    const user = await getUser(username); // check username exists
    if (!user) throw Error("User not found"); // throw error if not 

    const isMatch = await bcrypt.compare(password, user.password); // compares password and hashed password
    if (!isMatch) throw Error("Wrong password"); //check password matches 

    return user._doc; // if no errors return user given 
};

//UPDATE - just password 
async function updatePassword(id, password, newPassword) { // need to be logged in
    const user = await User.findById(id);
    if (!user) {
        throw Error("User not found");
    }

    if (user.password !== password) {
        throw Error("Incorrect password");
    }

    const updatedUser = await User.findByIdAndUpdate(id, { password: newPassword }); // change to findbyID and update function 

    return { message: "User updated successfully", user: updatedUser }; //NOT CORRECT - CREATE FUNCTIONLITY TO TAKE IN TWO PASSWORDS AND CHECK  
};

// DESTROY - Delete a user 
async function deleteUser(id) {
    await User.deleteOne({ "_id": id });
};

// Utility functions
async function getUser(username) { //Whenever using repeated code, even once, create a seperate function
    return await User.findOne({ "username": username }); // checks if username exists 
}


//Export all functions we need to access in route files
module.exports = { register, login, updatePassword, deleteUser };

