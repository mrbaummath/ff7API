//import dependencies
require("dotenv").config()
const express = require("express") // import express
const morgan = require("morgan") // import morgan


//middleware function
const middleware = (app) => {
    app.use(morgan("tiny"))
    app.use(express.urlencoded({ extended: true })) 
    app.use(express.static("public")) 
    app.use(express.json())
}

module.exports = middleware