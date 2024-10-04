// HAD AN ISSUE WITH THE TOKEN BEING UNDEFINED UNTIL I MOVED THE JSONWEB TOKEN IMPORTS TO THE TOP OF THIS FILE -  - you can add this once to the top of the server file to avoid this issue

const jwt = require('jsonwebtoken')
const User = require('../model/User')

// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
const bcrypt = require('bcrypt')

// const fsPromises = require('fs').promises
// const path = require('path')


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'})
    
    // const foundUser = usersDB.users.find(person => person.username === user)
    const foundUser = await User.findOne({username: user}).exec()
    if (!foundUser) return res.sendStatus(401) // Unauthorised
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        const roles = Object.values(foundUser.roles)
        //create a couple of JWT to use with the other routes that we want protected in the API (normal and refresh token)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles //this only sends the codes for the roles (does not explicility state if a user is admin etc)       
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120s' } // 5 or 15 minutes in production
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } 
        )
        //saving refreshToken with current user (invalidates refreshToken upon their logout)
        // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        // const currentUser = {...foundUser, refreshToken}
        // usersDB.setUsers([...otherUsers, currentUser])
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // )
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)
        
        //NB if checking refreshToken endpoint using ThunderClient you need to remove secure: true from the below code for testing (but this line is required from chrome and will need it for production)
        // secure: true, 
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}) // httpOnly so even though the token is stored as a cookie it is not accessible with JS. The formula at the end sets the refreshToken life span to 24 hours (the unit in the calculation is ms)
        res.json({ accessToken }) // store this accessToken as memory (state) on the FrontEnd
    } else {
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}