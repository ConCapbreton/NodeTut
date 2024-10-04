
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401) // not authorised status
    // console.log(authHeader) // the log will show 'Bearer' and then the token
    const token = authHeader.split(' ')[1] // split in the 1 position (eliminated 'Bearer' from the authHeader)
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403) // forbidden - recieved a token but something about it wasnt right (so it may have been tampered with)
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT