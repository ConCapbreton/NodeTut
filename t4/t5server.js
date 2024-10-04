// HAD AN ISSUE WITH THE TOKEN BEING UNDEFINED UNTIL I MOVED THE JSONWEB TOKEN IMPORTS TO THE TOP OF THIS FILE - you can add this once to the top of the server file to avoid this issue


require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500
const { logger, logEvents } = require('./middleware/LogEvents')
const { errorHandler } = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cookieParser = require('cookie-parser')

// Connect to MongoDB
connectDB()

// custom middleware logger (need next as it is not included like in the built in middle ware)
app.use(logger)

//Handle options credentials check - BEFORE CORS!
//and fetch cookies credentials requirement on the FrontEnd

app.use(credentials)

app.use(cors(corsOptions))

//built in middleware (applied to all routes):
//Content-type: application/x-www-form-urlencoded)
app.use(express.urlencoded({extended: false}))

//for json
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

// serve static files (eg images, css, text)
app.use(express.static(path.join(__dirname, '/public'))) // put them in the public folder...
// app.use('/subdir', express.static(path.join(__dirname, '/public'))) 

// routes
app.use('/', require('./routes/api/root'))
// app.use('/subdir', require('./routes/subdir'))
app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))

app.use('/refresh', require('./routes/api/refresh')) //refresh end point receives the cookie that has the refresh token that will issue a new accessToken once the first has expired 
app.use('/logout', require('./routes/api/logout')) 

app.use(verifyJWT) // every route after this line in the file will need authorisation
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } 
    if (req.accepts('json')) {
        res.json({error: "404 Not Found"})
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
})

// express allows regex. so the ^/$|/index(.html)? tells express that it has to begin with / or /index.html and the html is optional


// //route handlers (function chaining using next)
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log("attempted to load hello.html")
//     next()
// }, (req, res) => {
//     res.send('hello world')
// })

// //another function chaining option
// const one = (req, res, next) => {
//     console.log('one')
//     next()
// }
// const two = (req, res, next) => {
//     console.log('two')
//     next()
// }
// const three = (req, res) => {
//     console.log('three')
//     res.send('finished')
// }

// app.get('/chain(.html)?', [one, two, three])

// using regex again you get everything with '/*'
// app.use('/') app.use overall is more likely to be used for middleware
// started with app.get('/*') and replaced with app.all (which is more for routing and will apply to all http methods at once and also allows regex)
