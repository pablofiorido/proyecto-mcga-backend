const actionHandler = require("../helpers/actionHandler");
const authModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../helpers/encrypt");
const bcrypt = require("bcrypt");
const mapResponse = require("../helpers/responseMapper");

const controller = {
  createUser: (data) =>
    new Promise((resolve, reject) => {
      return actionHandler(() => {
        // busca uno, si no existe, lo crea. Busca en base al email. --> { email: data.email }
        return authModel.findOne({ email: data.email }, async (err, user) => {
          if (err) reject(err.message);
          if (user) reject("User already already exists.");
          // crea uno nuevo en la bd.
          const result = await authModel.create(data);
          resolve(result);
        });
      });
    }),
    login: (req, res) => {
      console.log(req.body);
      authModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.send(mapResponse({}, false, err.message)).json();
  
        if (!user)
          return res.send(mapResponse({}, false, "Invalid Credentials")).json();
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) return res.send(mapResponse({}, false, err.message)).json();
          if (!isMatch)
            return res.send(mapResponse({}, false, "Invalid Credentials"));
          const token = jwt.sign({ user }, `${process.env.SECRET_KEY}`);
          return res.send(
            mapResponse(
              {
                ...user._doc,
                jwt: token,
              },
              true
            )
          );
        });
      });
    },
};

module.exports = controller;