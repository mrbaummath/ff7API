//import dependencies
const express = require("express")
const Materia = require("../models/materia")

//create router
const router = express.Router()

//index 
router.get("/", (req, res)=> {
    Materia.find({})
        .then((materias) => {
            res.json({ materias: materias})
        })
        .catch((error) => {
            res.json({ error })
        })
})

//index by ownership
router.get("/mine", (req, res) => {
    Materia.find({ owner: req.session.userId })
        .then(materias => {
            res.status(200).json({ materias: materias })
        })
        .catch(err => console.log(err))
})

//create
router.post("/", (req, res) => {
    req.body.owner = req.session.userId
    Materia.create(req.body)
        .then(materia => {
            res.json({materia: materia.toObject()})
        })
        .catch(err => console.log(err))
})

//update 
router.put("/:id", (req,res) => {
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
router.delete('/:id', (req,res) => {
    const id = req.params.id
    Materia.findByIdAndRemove(id)
    .then(materia => {
        res.sendStatus(204)
    })
    .catch(err => console.log(err))
})

//show
router.get('/:id', (req,res) => {
    const id = req.params.id
    Materia.findById(id)
        .then(materia => {
            console.log(materia)
            res.json({materia: materia})
        })
        .catch(err => console.log(err))

})

//export router
module.exports = router