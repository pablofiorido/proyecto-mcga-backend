const express = require("express");
const tasks = require('./tasks');
const auth = require('./auth');

const router = express.Router();

//SEPARO LAS RUTAS 
router.use("/todos", tasks);
router.use("/auth", auth);

module.exports = router;


