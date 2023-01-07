
const express = require('express');
const path = require('path')
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
dotenv.config();

const bodyParser = require('body-parser');

//middleware

app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/users", (req,res) => {res.send('Welvcome to Users')})
// app.get("/", (req,res) => {res.send('Home Page in Node JS')})


// ^ above is the last route of my express app. 
// below tells your server to redirect all other routes to index.html from React
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app 