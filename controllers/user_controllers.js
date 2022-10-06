//Import dependencies

const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//create Router
const router = express.Router()

//Routes

//signup routes

//GET route
router.get('/signup', (req, res) => {
    res.render('users/signup')
})

//POST route
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

//login 

//GET route for login
router.get('/login', (req, res) => {
    res.render('users/login')
})

//POST route for login
router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username })
    .then(async (user) => {
        if (user) {
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                req.session.username = username
                req.session.loggedIn = true
                req.session.userId = user.id
                res.redirect('/materias')
                return
            } else {
                res.json({ error: 'username or password incorrect' })
                return
            }

        } else {
            res.json({ error: 'user dne' })
            return
        }
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

//logout

//delete

router.delete('/logout', (req,res) => {
    req.session.destroy(err => {
        console.log('logged out', req.session)
        console.log('error on logout?', err)
        res.sendStatus(204)
        return
    })
})

module.exports = router