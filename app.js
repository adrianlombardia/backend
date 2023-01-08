
const express = require('express');
const app = express();


const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');


//////ROUTES 
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


//// Socket io//////////////
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
  cors:{
    origin:"*"
  }
});
const connectToXStore = require('./sockets/index');
app.use("/api/socket", connectToXStore);

////////////////////////



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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app 