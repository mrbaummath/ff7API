//Import dependencies

require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

//database connection
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => console.log("Connected to db"))
    .on("close", () => console.log("Disconnected from db"))
    .on("error", (err) => console.error(err))

//create materia model schema
const { Schema, model } = mongoose

const materiasSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        enum: ['green', 'red', 'yellow', 'purple', 'blue'],
        required: true,
    },
    maxAP: {
        type: Number,
        required: true
    },
    common: {
        type: Boolean,
        required: true
    }
})

//create model
const Materia = model("Materia", materiasSchema)
module.exports = Materia

//application object
const app = express()

//middleware
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public")) 
app.use(express.json())



//Routes
//seed
app.get("/materias/seed", (req, res) => {
    //starting materia for testing purposes
    const startMaterias = [
        {name: "Fire", color: "green", maxAP: 55000, common: true},
        {name: "Restore", color: "green", maxAP: 85000, common: true},
        {name: "Knights of the Round", color: "red", maxAP: 1000000, common: false},
        {name: "All", color: "blue", maxAP: 60000, common: true}
    ]
    //delete all materias
    Materia.deleteMany({}).then((materias) => {
        //seed
        Materia.create(startMaterias)
            .then((Materias) => {
                res.json(Materias)
            })
    })
})

//landing
app.get("/", (req, res) => {
    res.send("Welcome to my Materia API")
})

//index 
app.get("/materias", (req, res)=> {
    Materia.find({})
        .then((materias) => {
            res.json({ materias: materias})
        })
        .catch((error) => {
            res.json({ error })
        })
})

//Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
