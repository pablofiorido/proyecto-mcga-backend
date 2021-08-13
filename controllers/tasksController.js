const actionHandler = require("../helpers/actionHandler");
const handleError = require("../helpers/errorHandler");
const taskModel = require("../models/tasks");

const controller = {
    getAllTaks: () => {
        return actionHandler(() => taskModel.find());
    },

    addTask: (data) => 
    new Promise((resolve, reject) => {
        return actionHandler(async()  => {
            const result = await taskModel.create(data)
            resolve(result);
        });
    }),
    
    removeTask: (id) => 
    new Promise((resolve, reject) => {
        return actionHandler(async() => {
            const result = await taskModel.deleteOne({ _id: id })
            resolve(result)
        });
    }),
    
    editTask: (data) => {
        return actionHandler(() => taskModel.findOneAndUpdate({ _id: data._id }, data, { new: true, useFindAndModify: false }, handleError));
    }
}

module.exports = controller;