const express = require("express");

const router = express.Router();

const list = [{ id: 1, description: "task_1" }, { id: 2, description: "task_2" }]

router.get("/", function (req, res) {
    res.send(list).json()
});

router.post("/", function (req, res) {
    console.log(req)
    list.push(req.body.description)
    res.send(list).json()
});


router.delete("/", function (req, res) {
    const newList = list.filter(item => item !== req.body.description)
    res.send(newList).json()
});

router.put("/:id", function (req, res) {
    const index = list.findIndex(item => item.id === req.params.id)
    if (index !== -1) {

        res.send("no se pudo encontrar el elemento que intenta editar")

    } else {

        list.splice(index, 1, { id: req.params.id, description: req.body.description })
        res.send(list).json()
    }

});

module.exports = router;
