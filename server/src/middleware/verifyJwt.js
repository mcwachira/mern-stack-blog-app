const jwt = require('jsonwebtoken')


const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const cookies = req.cookies
    console.log(cookies.refreshToken)
    if (!authHeader) return res.sendStatus(401)
    console.log(authHeader)

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.email
            next()

        }
    )
}


// const handleRefreshToken = async (req, res,) => {
//     const cookies = req.cookies
//     console.log(cookies)
//     // if (!cookies.refreshToken) return res.sendStatus(401)

//     // const refreshToken = cookies.refreshToken

//     // //check if token is valid
//     // jwt.verify(refreshToken, process.env.REFRESH_TOKEN,
//     //     (error, decoded) => {
//     //         // console.log(decoded)
//     //         if (error) return res.sendStatus(403) //forbidden
//     //         const accessToken = jwt.sign({
//     //             "email": decoded.email
//     //         },
//     //             process.env.ACCESS_TOKEN,
//     //             { expiresIn: '15m' }
//     //         )
//     //         res.json({ accessToken })

//     //     })


// }
module.exports = verifyJwt