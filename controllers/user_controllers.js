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
            res.redirect('/users/login')
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
                res.redirect(`/error?error=username%20or%20password%20incorrect`)
                return
            }

        } else {
            res.redirect(`/error?error=user%20does%20not%20exist`)
            return
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
})

//logout

//delete

router.delete('/logout', (req,res) => {
    req.session.destroy(err => {
        console.log('logged out', req.session)
        console.log('error on logout?', err)
        res.redirect('/')
        return
    })
})

module.exports = router