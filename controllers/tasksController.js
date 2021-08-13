const actionHandler = require("../helpers/actionHandler");
const handleError = require("../helpers/errorHandler");
const taskModel = require("../models/tasks");

const controller = {
    getAllTaks: () => {
        return actionHandler(() => taskModel.find());       //DEVUELVE TODAS LAS TAREAS
    },

    addTask: (data) => 
    new Promise((resolve, reject) => {
        return actionHandler(async()  => {
            const result = await taskModel.create(data)     //CREA UNA TAREA NUEVA  (SE AGREGO LA PROMESA POR QUE NO FUNCIONABA)
            resolve(result);
        });
    }),
    
    removeTask: (id) => 
    new Promise((resolve, reject) => {
        return actionHandler(async() => {
            const result = await taskModel.deleteOne({ _id: id })   //ELIMINA LA TAREA POR ID
            resolve(result)
        });
    }),
    
    editTask: (data) => {
        return actionHandler(() => taskModel.findOneAndUpdate({ _id: data._id }, data, { new: true, useFindAndModify: false }, handleError));   //EDITA LA TAREA, ACA LE SACAMOS LA PROMESA POR QUE TIRABA ERROR DE ID. ES UN MISTERIO
    }
}

module.exports = controller;        //SE EXPORTA PARA PODER USARLO EN LOS ENDPOINTS