const actionHandler = require("../helpers/actionHandler");
const authModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../helpers/encrypt");
const bcrypt = require("bcrypt");
const mapResponse = require("../helpers/responseMapper");

const controller = {
  createUser: (data) =>
  //SE AGREGO LA PROMESA POR QUE NO FUNCIONABA :(
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
      console.log(req.body);  //DEBUG
      //CHEQUEA SI EL USER EXISTE EN LA BD
      authModel.findOne({ email: req.body.email }, (err, user) => {
        //SI NO ENCUENTRA EL USER O SI HAY UN ERROR LO DEVUELVE A LA PAGINA PRINCIPAL
        if (err) return res.send(mapResponse({}, false, err.message)).json();
        if (!user)
          return res.send(mapResponse({}, false, "Invalid Credentials")).json();
          
          //YA ENCONTRO EL USER, AHORA COMPARA LA CLAVE
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          //SI HAY UN ERROR CON EL HASH DE LA CLAVE LO DEVUELVE A LA PAGINA PRINCIPAL
          if (err) return res.send(mapResponse({}, false, err.message)).json();
          
          if (!isMatch)
            //SI LA PASSWORD NO MACHEA ENVIA EL ERROR
            return res.send(mapResponse({}, false, "Invalid Credentials"));

          //SI ESTA TODO OK GENERA EL TOKEN Y LO DEVUELVE.  
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