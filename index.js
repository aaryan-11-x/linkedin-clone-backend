const express = require('express')
const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const User = require('./models/User')
const mongoose = require('mongoose')

const app = express()

// MongoDB Connection
mongoose.connect('mongodb+srv://root:toor@cluster0.aehucm5.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(x => console.log('Connected to MongoDB!')).catch(err => console.log('Error occured while connecting to MongoDB'))


// Passport-jwt Setup
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'
passport.use(new JwtStrategy(opts, function(jwt_payload, done){
    User.findOne({id: jwt_payload.identifier}, function(err, user){
        if(err)
            return done(err, false)
        if(user)
            return done(null, user)
        else
            return done(null, false)
    })
}))

app.get('/', (req, res) => {
    res.send('This is Aaryan')
})
app.get('/hello', (req, res) => {
    res.send('This is another route')
})

app.listen(8000, () => console.log('Server running on Port 8000'))