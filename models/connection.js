require("dotenv").config()
const mongoose = require("mongoose")

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

//export connection
module.exports = mongoose