const { urlencoded, json } = require('body-parser')
const express = require('express')
const api = require("./routes/api")
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/api", api)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

