const jwt = require('jsonwebtoken')


//array to store our refreshed tokens
let refreshTokens = []

//a function to generate our token
const generateAccessToken = (user) => {
    // console.log('hello user', user)
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: "15m"
    })

}


//function to refresh our generated token
const generateRefreshToken = (user) => {
    // console.log(user)
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
        expiresIn: "1d"
    })

}


const refreshToken = async (req, res) => {
    const refreshToken = cookies.refreshToken
    //check id the refresh token is available and send error message if its not
    if (!refreshToken) return res.status(400).json('You are not authenticated')

    // //check if the refresh token is in the array
    // if (!refreshTokens.includes(refreshToken)) {
    //     return res.status(403).json('Refresh token  is not correct')
    //     //
    // }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) => {
        if (error) return res.sendStatus(403)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        //add the regenerated refresh token
        // refreshTokens.push(newRefreshToken)

        res.cookie('accessToken', newAccessToken, {
            maxAge: 300000, //5 minutes
            httpOnly: true
        })
        //set refresh token in cookie

        res.cookie('refreshToken', newRefreshToken, {
            maxAge: 3.15e10, //5min
            httpOnly: true
        })


        res.json({
            "access token": newAccessToken,
            "refresh token": newRefreshToken

        })
    })

}
module.exports = {
    generateAccessToken,
    generateRefreshToken
}