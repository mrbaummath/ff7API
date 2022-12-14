//Import dependencies

require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const path = require("path")
const MateriaRouter = require("./controllers/materia_controllers")
const UserRouter = require("./controllers/user_controllers")
const spellRouter = require("./controllers/spell_controllers")
const middleware = require("./utils/middleware")



//application object
const app = require("liquid-express-views")(express())

//middleware
middleware(app)

//home routes

//GET route
app.get("/", (req, res) => {
    res.render('index')
})

//register materia routes
app.use('/materias', MateriaRouter)
//register user routes
app.use('/users', UserRouter)
//register spell routes
app.use('/spells', spellRouter)


//error route
app.get('/error', (req, res) => {
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', { error, username, loggedIn, userId })
})

//catchall error route
app.all('*', (req, res) => {
    res.redirect('/error')
})

//Server listener
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
