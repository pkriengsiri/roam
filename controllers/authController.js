const db = require("../models");
const bcrypt = require("bcrypt");
//json web token

module.exports = {
  createNewUser: function (req, res) {
    const userToCreate = {
      email: req.body.email,
    };
    bcrypt.hash(req.body.password, 8, (err, hashedPassword) => {
      if (err) throw new Error(err);
      console.log(hashedPassword);
      db.User.create(userToCreate)
        .then((newUser) => {
          console.log(newUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).end();
        });
    });
  },
};
