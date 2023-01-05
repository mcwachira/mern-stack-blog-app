const jwt = require('jsonwebtoken')
const handleRefreshToken = async (req, res,) => {
    const cookies = req.cookies
    console.log(cookies)
    if (!cookies.refreshToken) return res.sendStatus(401)

    const refreshToken = cookies.refreshToken

    //check if token is valid
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN,
        (error, decoded) => {
            console.log(decoded)
            // if (error) return res.sendStatus(403) //forbidden
            // const accessToken = jwt.sign({
            //     "email": decoded.email
            // },
            //     process.env.ACCESS_TOKEN,
            //     { expiresIn: '15m' }
            // )
            // res.json({ accessToken })

        })


}

module.exports = handleRefreshToken