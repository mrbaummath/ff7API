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
            const { username, loggedIn, userId } = req.session
            res.render('materias/index', { materias, username, loggedIn, userId })
            return
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

//GET route for index by ownership
router.get("/mine", (req, res) => {
    Materia.find({ owner: req.session.userId })
        .then(materias => {
            const { username, loggedIn, userId } = req.session
            res.render('materias/index', { materias, username, loggedIn, userId } )
            return
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

//create

//GET
router.get("/new", (req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('materias/new', { username, loggedIn, userId })
})

//POST
router.post("/", (req, res) => {
    req.body.owner = req.session.userId
    req.body.common = req.body.common === 'on' ? false : true
    Materia.create(req.body)
        .then(materia => {
            res.redirect('/materias')
            return
        })
        .catch(err => res.redirect(`/error?error=${err}`))
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
                        res.redirect('/materias')
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
            const { username, loggedIn, userId } = req.session
            res.render('materias/show', { materia, username, loggedIn, userId } )
            return
        })
        .catch(err => console.log(err))

})

//export router
module.exports = router