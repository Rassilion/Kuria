import passport from 'passport'
import LocalStrategy from './localStrategy'
import { User, UserModel } from '../models/user'

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user: UserModel, done) => {
    console.log('*** serializeUser called, user: ')
    console.log(user) // the whole raw user object!
    console.log('---------')
    done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
    console.log('DeserializeUser called')
    User.findOne({ _id: id }, 'username', (err, user) => {
        console.log('*** Deserialize user, user:')
        console.log(user)
        console.log('--------------')
        done(null, user)
    })
})

//  Use Strategies
passport.use(LocalStrategy)

export default passport
