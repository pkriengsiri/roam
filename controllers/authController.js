const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createNewUser: function (req, res) {
    const userToCreate = {
      email: req.body.email,
    };
    bcrypt.hash(req.body.password, 8, (err, hashedPassword) => {
      if (err) throw new Error(err);

      userToCreate.password = hashedPassword;
      db.User.create(userToCreate)
        .then((newUser) => {
          const token = jwt.sign(
            { _id: newUser._id, email: newUser.email },
            process.env.SECRET
          );
          res.cookie("token", token, { httpOnly: true });
          res.json({ token: token });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).end();
        });
    });
  },

  loginUser: function (req, res) {
    db.User.findOne({ email: req.body.email.toLowerCase() })
      .then((foundUser) => {
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              { _id: foundUser._id, email: foundUser.email },
              process.env.SECRET
            );
            res.cookie("token", token, { httpOnly: true });
            res.json({ token: token });
          } else {
            res.status(401).end();
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
  },
  reLogin: function (req, res) {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        console.log(err);
        res.status(401).end();
      } else {
        db.User.findOne({ _id: data._id })
          .then((foundUser) => {
            const token = jwt.sign(
              { _id: foundUser._id, email: foundUser.email },
              process.env.SECRET
            );
            res.cookie("token", token, { httpOnly: true });
            res.json({ token: token });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });
      }
    });
  },
};
