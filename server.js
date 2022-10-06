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

//landing router
app.get("/", (req, res) => {
    res.send("Welcome to my Materia API")
})

//register materia routes
app.use('/materias', MateriaRouter)
//register user routes
app.use('/users', UserRouter)
//register spell routes
app.use('/spells', spellRouter)




//Server listener
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
