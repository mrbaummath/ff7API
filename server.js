//Import dependencies

require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("./models/connection")
const path = require("path")
const middleware = require("./utils/middleware")
const Materia = require("./models/materia")


//application object
const app = express()

//middleware
middleware(app)


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

//create
app.post("/materias", (req, res) => {
    Materia.create(req.body)
        .then(materia => {
            res.json({materia: materia.toObject()})
        })
        .catch(err => console.log(err))
})

//update 
app.put("/materias/:id", (req,res) => {
    const id = req.params.id
    //we'll use a single mongoose model method for now but this will need to be updated. FindByIdandUpdate needs and id, a req.body, and whether the info is new
    Materia.findByIdAndUpdate(id,req.body, {new: true})
        .then(materia => {
            console.log('updated', materia)
            res.sendStatus(204)
        })
        .catch(err => console.log(err))

})

//delete 
app.delete('/materias/:id', (req,res) => {
    const id = req.params.id
    Materia.findByIdAndRemove(id)
    .then(materia => {
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})

//show
app.get('/materias/:id', (req,res) => {
    const id = req.params.id
    Materia.findById(id)
        .then(materia => {
            console.log(materia)
            res.json({materia: materia})
        })
        .catch(err => console.log(err))

})


//Server listener
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
