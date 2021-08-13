const jwt = require("jsonwebtoken");
const mapResponse = require("../helpers/responseMapper");

//EL MIDDLEWARE ES UNA FUNCION QUE SE EJECUTA ENTRE ALGO, EN ESTE CASO ENTRE LA REQUEST DEL CLIENTE Y EL SERVER
const checkToken = (req, res, next) => {

  //GUARDA EL TOKEN QUE VIENE EN EL HEADER DE LA REQUEST
  const token = req.headers.authorization;
  //LUEGO VERIFICA SI EL TOKEN EXISTE Y SI ES VALIDO
  try {
    const isValid = !!jwt.verify(token, `${process.env.SECRET_KEY}`);
    if (!isValid) {
      return res.send(mapResponse({}, false, "Invalid Token")).json();
    }
    //SI ES VALIDO EJECUTA EL NEXT PARA QUE CONTINUE CON EL MIDDLEWARE
    next();
  } catch (error) {
    return res.send(mapResponse({}, false, "Invalid Token")).json();
  }
};

module.exports = {
  checkToken,
};
