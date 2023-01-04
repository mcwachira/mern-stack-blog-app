const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateAccessToken,
    generateRefreshToken } = require('../utils/generateTokens')



const registerUser = async (newUser) => {
    const { username, email, password } = newUser

    //check for existing user or duplicates
    //.exec() enables use to get a promise back

    try {
        const duplicateUser = await User.findOne({ username }).exec()
        if (duplicateUser) {
            throw Error('username already in use')
            // return


        }


    } catch (error) {
        // throw Error(error)
        console.log(error)
    }

    //check if  email has already exist in the database


    try {

    } catch (error) {

    }

    const emailExist = await User.findOne({ email }).exec()

    if (emailExist) {
        throw Error('email already in use')



    }




    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds 10
    const userObject = {
        "username": username,
        email: email,
        'password': hashedPassword,


    }
    const user = await User.create(userObject)

    if (user) {

        return user
    } else {
        res.status(400).json('user not created')
    }


}



const logInUser = async (loggedUser) => {
    const { email, password } = loggedUser


    //check if email exist


    const user = await User.findOne({ email }).exec()

    if (!user) {
        return res.status(400).json({ message: 'user with that email does not exist' })
    }

    //check if password is valid
    const validate = await bcrypt.compare(password, user.password)
    if (user && validate === false) {
        return res.status(401).send({ error: 'Email and password do not match ' })
    }

    // const accessToken = generateAccessToken(user)
    // const refreshToken = generateRefreshToken(user)

    return res.status(200).json({

        ...user,
        // accessToken,
        // refreshToken
    }
    )

}

module.exports = {

    registerUser,
    logInUser,

}