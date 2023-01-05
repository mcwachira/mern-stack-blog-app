import jwt from 'jsonwebtoken'
//sign jwt
export const signJwt = (payload, expiresIn) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { algorithm: 'RS256', expiresIn })
}

//verify jwt

export const verifyJwt = (token) => {
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN)
        return { payload: decoded, expired: false }
    } catch (error) {
        return { payload: null, expired: error.message.includes('jwt expired') }
    }

}

// //crete access token 
// const AccessToken = jwt.sign({ email, name }, process.env.ACCESS_TOKEN, {
//     expiresIn: '15min'
// })


// //crete refresh token 
// const refreshToken = jwt.sign({ email, name }, process.env.ACCESS_TOKEN, {
//     expiresIn: '1d'
// })
//crete access token 
const accessToken = signJwt({ email, name }, '1hr')


//crete refresh token 
const refreshToken = signJwt({ email, name }, '1y')

//set access token in cookie

res.cookie('accessToken', accessToken, {
    maxAge: 300000, //5min
    httpOnly: true
})

res.cookie('refreshToken', accessToken, {
    maxAge: 3.15e10, //5min
    httpOnly: true
})


//set access token in cookie
return res.send(verifyJwt(accessToken).payload)