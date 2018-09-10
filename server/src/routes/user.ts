import express, { Request, Response } from 'express'

import passport from '../passport'
import { User } from '../models/user'

const router = express.Router()

router.post('/', (req, res) => {
    console.log('user signup')

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        } else {
            const newUser = new User({
                username,
                password
            })
            newUser.save((err, savedUser) => {
                if (err) {
                    return res.json(err)
                }
                return res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    (req, res, next) => {
        console.log('routes/user.js, login, req.body: ')
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user)
        const userInfo = {
            username: req.user.username
        }
        res.send(userInfo)
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

export default router
