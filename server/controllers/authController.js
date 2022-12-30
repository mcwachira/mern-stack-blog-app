const User = require('../models/User')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')



const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email, profilePic } = req.body

    //first thing is to check the data

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    //check for existing user or duplicates
    //.exec() enables use to get a promise back
    const duplicateUser = await User.findOne({ username }).lean().exec()
    if (duplicateUser) {
        return res.status(409).json({ message: 'user name already in use' })
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds 10

    const userObject = {
        "username": username,
        email: email,
        'password': hashedPassword,
        "profilePic": profilePic

    }
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({ message: ` New user created ${username}` })
    } else {

        res.status(400).json({ message: 'user not created . invalid user data' })
    }
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //first thing is to check the data

    if (!email || !password) {
        return res.status(400).json({ message: 'all fields are required' })
    }

    //check  if User exist 
    const user = await User.findOne({ email }).lean().exec()
    if (!user) {
        return res.status(400).json({ message: 'no user with that email exist' })
    }

    //check if password is correct

    const validate = await bcrypt.compare(password, user.password)

    if (!validate) {
        return res.status(401).json({ message: 'password is wrong please enter the correct password' })
    } else {
        res.status(201).json(user)
    }



})

module.exports = {
    registerUser,
    loginUser
}