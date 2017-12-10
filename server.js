/**
 * Created by sesha on 6/2/17.
 */

// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
var logout = require('express-passport-logout');

// -- Asgn 6
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET}));
app.use(session({secret: 'sai-v'}));
// , resave: false, saveUninitialized: true}));


app.use(passport.initialize());
app.use(passport.session());
// -- Asgn 6


// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));


// CORS
app.use(function (req, res, next) {

  // res.header("Access-Control-Allow-Origin", "*");

  // Asgn 6 - replace above line with this
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Asgn - 6
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

require("./assignment/app")(app);
server.listen(port);

var serverSide = require("./server/test-mongodb/app");
serverSide(app);


// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  // res.sendFile(path.join(__dirname, './dist/index.html'));
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// app.get('/logout', logout());
// // server.listen(port, () => console.log('Running'));
// server.listen(3000);
