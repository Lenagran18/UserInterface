require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');


//signify routes to access - require user file in routes
const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');

mongoose.connect(process.env.dbURL)
    .then(console.log("DB Connected!"))
    .catch(error => console.log(error));

app.use(express.json()); //to parse JSON bodies for express 

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

//CORS malware 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-Requested-Width, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Origin", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/user', userRoutes); // to use any of the routes you have to enter user 
app.use('/post', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
