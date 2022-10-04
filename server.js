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

//application object
const app = express()

//middleware
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true })) 
app.use(express.static("public")) 
app.use(express.json())

//Server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
