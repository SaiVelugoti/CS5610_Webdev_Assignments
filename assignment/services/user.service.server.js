module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt = require("bcrypt-nodejs");


  var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  }
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new LocalStrategy(localStrategy));

  app.post("/api/user", createUser);
  app.get("/api/user", findUsers);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.post("/api/loggedIn", loggedin);
  app.delete('/api/deleteAllUsers', deleteAllUsers);

  app.get('/facebook/login', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    }));

  function login(req, res) {
    console.log("In login - after local strategy");
    var user = req.user;
    res.json(user);
    // userModel
    //   .findUserByUsername(user.username)
    //   .then(function (userA) {
    //     if (userA && bcrypt.compareSync(userA['password'], user.password)) {
    //       return done(null, userA);
    //     } else {
    //       return done(null, false);
    //     }
    //
    //   }, function (err) {
    //     return done(null, false);
    //
    //   });
  }

  function logout(req, res) {
    "use strict";
    req.logOut();
    req.user = '';
    res.send(200);
  }

  function register(req, res) {
    "use strict";
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    // return userModel.createUser(user);

   return userModel.createUser(user)
      .then(
        function (user) {
          if(user){
            req.login(user, function (err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            })
          }
        })
  }

  function loggedin(req, res) {
    console.log('In user - server -> loggedIn');
    console.log(req.isAuthenticated());
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    "use strict";
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user.password)) {
            console.log('user credentials matches');
            // if (user.username == username && user.password == password) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function (user) {
        res.json(user);
      });
  }

  function findUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    if (username && password) {
      userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.json(null);
          }
        });
      return;

    } else if (username) {
      userModel
        .findUserByUsername(username)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.json(null);
          }
        });
      return;
    }
    return res.json({});
  }

  function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
      .findUserById(userId)
      .then(function (user) {
        if (user) {
          res.json(user);
        } else {
          res.json(null);
        }
      });
    return;
    // var user;
    // for (let x = 0; x < users.length; x++) {
    //   if (users[x]._id === userId) {
    //     user = users[x];
    //   }
    // }
    // if (user) {
    //   res.json(user);
    // } else {
    //   res.json(null);
    // }
  }

  function updateUser(req, res) {

    var userId = req.params['userId'];
    var userBody = req.body;
    userModel.updateUser(userId, userBody)
      .then(function (returnedUser) {
        res.json(returnedUser);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    //var user = req.body;
    userModel.deleteUser(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function deleteAllUsers(req, res) {
    userModel.deleteAllUsers()
      .then(function (res1) {
        res.json(res1);
      })
  }
}
