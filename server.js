//Import dependencies

require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("./models/connection")
const path = require("path")
const MateriaRouter = require("./controllers/materia_controllers")
const middleware = require("./utils/middleware")
const Materia = require("./models/materia")


//application object
const app = express()

//middleware
middleware(app)

//landing router
app.get("/", (req, res) => {
    res.send("Welcome to my Materia API")
})

//register materia routes
app.use('/materias', MateriaRouter)




//Server listener
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
