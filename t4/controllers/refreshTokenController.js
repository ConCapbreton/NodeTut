// HAD AN ISSUE WITH THE TOKEN BEING UNDEFINED UNTIL I MOVED THE JSONWEB TOKEN IMPORTS TO THE TOP OF THIS FILE - you can add this once to the top of the server file to avoid this issue

const jwt = require('jsonwebtoken')
const User = require('../model/User')

// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401) // unauthorised error message - optional chaining at the begining meaning first check if there is cookies and then check if there is a jwt property
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    
    // THIS CODE WAS WHEN WE WERE WORKING WITH LOCAL JSON FILES (before MOngo)
    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    const foundUser = await User.findOne({ refreshToken }).exec()
    
    if (!foundUser) return res.sendStatus(403) // Forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                    process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'} // longer in production - 30s just for dev
            )
            res.json({accessToken})
        }
    )
        
}

module.exports = { handleRefreshToken }