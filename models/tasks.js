const mongoose = require("mongoose");


//MODELO DE TAREAS (TO-DO)
const schema = new mongoose.Schema({
    description: String,
});

const Task = mongoose.model('Task', schema);

module.exports = Task;

