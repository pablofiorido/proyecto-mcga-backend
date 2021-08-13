const express = require("express");
const controller = require("../../../controllers/tasksController");
const Task = require("../../../models/tasks");
const mapResponse = require("../../../helpers/responseMapper");
const { checkToken } = require("../../../helpers/middlewares");

const router = express.Router();

router.get("/", checkToken, async (req, res) => {
  //CHEQUEA EL TOKEN Y LUEGO OBTIENE LAS TAREAS DE LA CONTROLADORA
  const tasks = await controller.getAllTaks();
  //CHEQUEA CONTRA EL TIPO DE OBJETO POR QUE EL METODO DE LA CONTROLADORA DEVUELVE EL RESULTADO DE LA QUERY DE MONGO, 
  if (typeof tasks === "object") {
    //EL MAPRESPONSE EN UN HELPER PARA MAPEAR LAS RESPUESTAS Y QUE TODAS TENGAN EL MISMO FORMATO
    //DE ESA MANERA DESDE LA UI PODEMOS ACCEDER A LAS PROPIEDADES DEL OBJETO DE ESA RESPUESTA.
    res.send(mapResponse({data: tasks}, true)); 
  } else {
    //SI FALLA DEVUELVE EL ERROR AL CLIENTE.
    res.send(
      mapResponse(
        { data: [] },
        false,
        "Error trying to get the list of tasks, please try again"
      )
    );
  }
});

router.post("/add", checkToken, async (req, res) => {
  //OBTENGO LA INFO QUE VIAJA EN LA REQUEST, LA SACO DEL BODY
  const { description } = req.body;
  const result = await controller.addTask({ description });
  if (result instanceof Task) {
    res.send(mapResponse(result._doc, true, "")).json();
  }
  res.send(mapResponse({}, false, "Error trying to add the task")).json();
});

router.delete("/:id", checkToken, async (req, res) => {         //EL ENDPOINT CONTIENE EL ID DE LA TAREA A ELIMINAR, LOS DOS PUNTOS SON PARA INDICAR QUE VA A HABER UNA VARIABLE EN EL ENDPOINT LLAMADA id
  try {
    const _id = req.params.id.toString();   
    const result = await controller.removeTask(_id);  //SE LO PASO AL METODO COMO PARAMETRO
    if (result.ok === 1) {                            //EL RESULT ES 1 SUCCESS ELSE ERROR.
      res
        .send(mapResponse({ _id }, true, "Item has been removed successfully"))
        .json();
    } else {
      res
        .send(mapResponse({ _id }, false, "Error trying to remove the task"))
        .json();
    }
  } catch (error) {
    console.log(error.message);
  }
});

//EL EDIT SE PUEDE HACER SIN AGREGAR EDIT AL ENDPOINT POR QUE DEPENDE DEL METODO QUE MANDES, CON EL PUT DEBERIA ANDAR
//PUSIMOS EDIT PARA DIFERENCIAR Y NO HACERNOS UN CHOCLO
router.put("/edit/:id", checkToken, async (req, res) => {   //EL ID ES PARA SABER QUE TAREA EDITAR
  const result = await controller.editTask({
    ...req.body,
    _id: req.params.id.toString(),
  });
  if (result instanceof Task) {               //SI EL RESULT ES INSTANCIA DE TASK ES POR QUE FUE OK LA MODIFICACION.
    res.send(mapResponse(result._doc, true, "")).json();
  }
  res
    .send(mapResponse({ data: {} }, false, "Error trying to edit the task"))
    .json();
});

module.exports = router;