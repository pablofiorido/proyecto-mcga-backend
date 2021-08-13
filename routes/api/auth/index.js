const express = require("express");
const controller = require("../../../controllers/authController");
const User = require("../../../models/user");
const mapResponse = require("../../../helpers/responseMapper");
const { encrypt } = require("../../../helpers/encrypt");

const router = express.Router();

//ESTE ES PARA EL LOGIN
router.post("/login", (req, res) => {
  try {
    controller.login(req, res);
  } catch (error) {
    console.log(error.message);
  }
});


//ESTE ES PARA DAR DE ALTA UN USUARIO, PROBADO CON POSTMAN Y FUNCIONA
router.post("/register", async (req, res) => {
  try {
    //OBTIENE LA DATA DE LA REQUEST QUE VIAJA EN EL BODY
    //ENCRIPTO LA PASSWORD
    //USA LA FUNCION ASYNC PARA PODER HACER EL AWAIT Y ESPERAR EL RESULTADO DEL ENCRYPT QUE SE TOMA SU TIEMPO.
    //EL ASYNC / AWAIT (IMPLEMENTADO EN ES6) NOS SIRVE PARA ESPERAR EL RESULTADO DE LA PROMISE
    // si no usara async/await, deberia ejecutar los metodos .then y .catch y luego meter el codigo o nestearlo dentro del .then porq necesito el resultado de la promesa.
    const { email, password, username, isAdmin } = req.body;
    const encryptedPassword = await encrypt(password);
    const result = await controller.createUser({
      email,
      password: encryptedPassword,
      username,
      isAdmin,
    });
    console.log(result, result instanceof User)
    if (result instanceof User) {
      const newUser = {
        _id: result._doc._id,
        email: result._doc.email,
        username: result._doc.username,
        isAdmin: result._doc.isAdmin,
        __v: result._doc.__v,
      };
      res.send(mapResponse(newUser, true, "")).json();
    }
    res.send(mapResponse({}, false, "Error trying to sign up")).json();
  } catch (error) {
    console.log("ERROR", error.message);
  }
});

module.exports = router;