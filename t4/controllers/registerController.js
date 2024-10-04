// THIS CODE WAS WHEN WE WERE WRITING TO A LOCAL JSON FILE (BEFORE UPDATING TO MONGODB)
// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises = require('fs').promises
// const path = require('path')

const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'})
    // check for duplicate usernames in the data base
    // const duplicate = usersDB.users.find(person => person.username === user)
    const duplicate = await User.findOne({username: user}).exec() // need exec in this instance of findOne (async / await) - read docs on mongoose.com for more info
    if (duplicate) return res.sendStatus(409) //Conflict error 409
    try {
        //encrypt password 
        const hashedPwd = await bcrypt.hash(pwd, 10)
        // create and store the new user (with mongoose)
        const result = await User.create ({
            "username": user, 
            "password": hashedPwd,
            // "roles": {"User": 2001}, DONT NEED THIS WITH MONGO AS IT IS ALREADY IN THE SCHEMA (AND AN ID)
        })

        console.log(result)

        //MIGHT ALSO SEE (but this is longer)
        // const newUser = new User()
        // newUser.username = ....
        // const result = await newUser.save()
        // OR
        //const newUser = new User({
        //   "username": user,
        //   "password": hashedPwd
        //}) and then await newUser.save()

        // usersDB.setUsers([...usersDB.users, newUser])
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // )
        // console.log(usersDB.users)
        res.status(201).json({'success': `New user ${user} created!`})
    } catch (err) {
        res.status(500).json({'message': err.message})
    }    
}

module.exports = { handleNewUser }