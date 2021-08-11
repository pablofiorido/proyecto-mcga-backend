
const express = require('express')
const mongoose = require('mongoose')
const api = require("./routes/api")
const app = express()
const port = 5050
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
require('dotenv').config()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use("/api", api)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    ConnectDB();
})

function ConnectDB (){
console.log('Process.env',process.env.CONNECTION_STRING)
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{console.log('Conectado')}).catch(()=>console.log('Error para conectar'))
;}

