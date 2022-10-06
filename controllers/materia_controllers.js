//import dependencies
const express = require('express')
const Materia = require('../models/materia')

//create router
const router = express.Router()

//index routes

//GET route for showing all
router.get("/", (req, res)=> {
    Materia.find({})
        .then((materias) => {
            res.json({ materias: materias})
            return
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
            return
        })
        .catch(err => console.log(err))
})

//create
router.post("/", (req, res) => {
    req.body.owner = req.session.userId
    Materia.create(req.body)
        .then(materia => {
            res.json({materia: materia.toObject()})
            return
        })
        .catch(err => console.log(err))
})

//update 
router.put("/:id", (req,res) => {
    const id = req.params.id
    const userId = req.session.userId
    Materia.findById(id)
        .then((materia) => {
            if (!req.session.loggedIn || userId != materia.owner) {
                res.sendStatus(401)
                return
            } else {
                materia.updateOne(req.body)
                    .then(query => {
                        console.log('updated', query)
                        res.sendStatus(204)
                        return
                    })
                    .catch(err => res.json(err))
            }
        })
        .catch(err => res.json(err))
})

//delete 
router.delete('/:id', (req,res) => {
    const id = req.params.id
    const userId = req.session.userId
    Materia.findById(id)
        .then(materia => {
            if (!req.session.loggedIn || userId != materia.owner) {
                res.sendStatus(401)
                return
            } else {
                materia.deleteOne()
                    .then(query => {
                        res.sendStatus(204)
                        return
                    })
                    .catch(err => {console.log(err)})
            }
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
            return
        })
        .catch(err => console.log(err))

})

//export router
module.exports = router