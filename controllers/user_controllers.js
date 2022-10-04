//Import dependencies

const express = require("express")
const User = require("../models/user.js")
const bcrypt = require("bcryptjs")

//create Router
const router = express.Router()

//Routes

router.post('/signup', async (req, res) => {
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(5)
    )
    User.create(req.body)
        .then(user => {
            console.log(user)
            res.status(201).json({ username: user.username })
        })
        .catch(err => console.log(err))
})

module.exports = router