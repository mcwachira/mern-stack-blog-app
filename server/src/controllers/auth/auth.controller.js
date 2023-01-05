
const authService = require('../../service/auth.service')
const AppError = require('../../utils/appError')


const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {


        next(new AppError('please fill in all the fields'), 400)

    }

    const newUser = {
        username, email, password
    }

    try {
        //send to auth service 
        const createUser = await authService.registerUser(newUser)
        res.status(200).json('user created successfully')
    } catch (error) {
        return (error)
    }


}



const logInUser = async (req, res, next) => {

    const { email, password } = req.body
    if (!email || !password) {
        next(new AppError('please fill in all the fields'), 400)

    }

    const loggedInUser = { email, password }


    try {
        //send to auth service 
        const signInUser = await authService.logInUser(loggedInUser)


        //crete access token
        const accessToken = signInUser.accessToken


        //crete refresh token 
        const refreshToken = signInUser.refreshToken

        //set access token in cookie

        res.cookie('accessToken', accessToken, {
            maxAge: 300000, //5 minutes
            httpOnly: true
        })


        //set refresh token in cookie

        res.cookie('refreshToken', refreshToken, {
            maxAge: 3.15e10, //5min
            httpOnly: true
        })




        res.status(200).json(signInUser)
    } catch (error) {
        console.log(error)
        return (error)
    }


}

module.exports = {

    registerUser,
    logInUser

}