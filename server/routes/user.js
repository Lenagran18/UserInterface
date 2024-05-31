//How front end accesses back end accessing functions 

//1. import libraries 
const express = require("express");
const User = require("../models/user"); // accesses functions in user model
const router = express.Router();

//2. Create all routes to access database - HTTP methods GET POST etc
router
    .post('/login', async (req, res) => { //use post(sent using body), get shows username and pass in URL 
        try {
            const user = await User.login(req.body.username, req.body.password);
            res.send({...user, password: undefined}); // send keys and values fr user but dont send password 
        } catch(error) { // catch errors found in model
            res.status(401).send({ message: error.message });
        }
    })

    .post('/register', async (req, res) => {
        try {
            const user = await User.register(req.body.username, req.body.password);
            res.send({...user, password: undefined});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .put('/update', async (req, res) => { // could use patch 
        try {
            const user = await User.updatePassword(req.body.id, req.body.password, req.body.newPassword);
            res.status(200).send(user);
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            await User.deleteUser(req.body.id);
            res.send({ success: "Account deleted" });
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

// 3. export router for use in index.js
module.exports = router;


        
