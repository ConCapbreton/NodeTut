// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }

// const fsPromises = require('fs').promises
// const path = require('path')

const User = require('../model/User')

const handleLogout = async (req, res) => {
    //On client also delete the accessToken
    
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No content error message (effectively successful in this case as we were going to erase i=the cookies anyway) - optional chaining at the begining meaning first check if there is cookies and then check if there is a jwt property
    const refreshToken = cookies.jwt
    
    //Is refreshToken in the dataBase
    const foundUser = await User.findOne({ refreshToken }).exec()
    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204) // no content
    }
    
    // have found refreshToken by this point and need to delete it
    // const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)    
    // const currentUser = {...foundUser, refreshToken: ''}
    // usersDB.setUsers([...otherUsers, currentUser])
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // )
    foundUser.refreshToken = ''
    const result = await foundUser.save() // saves changes back to the MongoDB collection
    console.log(result)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }) // secure: true - this means the site will only be served on https
    res.sendStatus(204)
}

module.exports = { handleLogout }