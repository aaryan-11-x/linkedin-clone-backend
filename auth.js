const express = require('express')
const User = require('./models/User')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    // This function will handle the register user logic

    // Step 1: Get details from req.body
    const {firstName, lastName, email, password} = req.body
    if (!firstName || !email || !password) {
        res.status(400).json({err: 'Invalid request body'})
    }

    // Step 2: Check if user with that email already exists or not
    const exisitingUser = await User.findOne({email: email})
    if (exisitingUser) {
        res.status(402).json({err: 'User with this email already exists'})
    }
    // Step 3: Create the user if above condition satisfies
    const hash_pass = await bcrypt.hash(password, 10)
    const newUserDetails = {firstName, lastName, email, password: hash_pass}
    const newUser = await User.create(newUserDetails)
    
    // Step 4: Create JWT and return the token to the user
    const token = await getToken(email, newUser)
    const userReturn = {...newUser.toJSON(), token}
    delete userReturn.password
    return res.status(200).json(userReturn)
})

router.post('/login', async (req, res) => {
    // Step 1: Get details from the request body
    const {email, password} = req.body

    // Step 2: Verify user
    const user = await User.findOne({email:email})
    if (!user)
        return res.status(401).json({err: "Invalid username or password"})

    // Step 3: Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid)
        return res.status(401).json({err:"Invalid username or password"})

    // Step 4: Generate token
    const token = await getToken(email, newUser)
    const userReturn = {...newUser.toJSON(), token}
    delete userReturn.password
    return res.status(200).json(userReturn)
})