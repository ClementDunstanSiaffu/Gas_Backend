require('./model/db')
const express = require("express")
const app = express()
const path = require('path')
const routes = require('./routes')
const PORT = process.env.PORT || 9000
app.get('/leta/:gas/:smoke/:flame/',routes.leta)
app.get("/pata",routes.pata)
app.listen(PORT)

