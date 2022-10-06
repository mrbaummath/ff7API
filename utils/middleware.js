//import dependencies
require('dotenv').config()
const MongoStore = require('connect-mongo')
const express = require('express') // import express
const morgan = require('morgan') // import morgan
const session = require('express-session')


//middleware function
const middleware = (app) => {
    app.use(morgan("tiny"))
    app.use(express.urlencoded({ extended: true })) 
    app.use(express.static("public")) 
    app.use(express.json())
    //session
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}

module.exports = middleware