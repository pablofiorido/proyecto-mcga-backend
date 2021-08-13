const bcrypt = require("bcrypt");

const encrypt = async (text) =>
  //LA PROMESA DEVUELVE EL HASH
  new Promise((resolve, reject) => {
    bcrypt.hash(text, 10, (err, hash) => {
      resolve(hash);
    });
  });

const decrypt = async (password, hash) =>
  Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  //ESTO SIRVE PARA EXPORTAR FUNCIONES, LA IMPORTO ABRIENDO LLAVES TENGO QUE HACER EL REQUIRE CON LLAVE
module.exports = {
  encrypt,
  decrypt,
};