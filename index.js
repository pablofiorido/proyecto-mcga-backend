
const express = require('express')
const mongoose = require('mongoose')
const api = require("./routes/api")
const app = express()
const port = 5050       //PUERTO DE ESCUCHA
const cors = require('cors');
const { urlencoded, json } = require('body-parser');

//CARGA VARIABLES DE ENTORNO
require('dotenv').config()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(urlencoded({ extended: false }));  //ESTE ES UN MIDDLEWARE PARA REALIZAR REQUEST ENTRE SERVIDORES O CLIENTES DESDE OTRO DOMINIO
app.use(json());        //PARA LA RUTA PRINCIPAL
app.use(cors());    //AGARRA LA REQUEST Y LA CONVIERTE EN OBJ DE .JS POR QUE LOS DATOS VIAJAN EN FORMATO JSON.      // JSON.parse() --> de string a objeto   // JSON.stringify() --> de objeto a string
app.use("/api", api)

app.listen(port, () => {        //ESCUCHA EN EL PUERTO DECLARADO EN LA VARIABLE PORT
    console.log(`Example app listening at http://localhost:${port}`)
    ConnectDB();
})


//CONECTA A BD
function ConnectDB (){
console.log('Process.env',process.env.CONNECTION_STRING)

//LA LIBRERIA DE MONGOOSE SE USA PARA EL MANEJO DE LA BASE DE DATOS DE MONGO
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{console.log('Conectado')}).catch(()=>console.log('Error para conectar'))
;}

