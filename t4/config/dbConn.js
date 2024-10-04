const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, 
            // { useUnifiedTopology: true, useNewUrlParser: true } THESE ARE NOW DEPRECIATED OPTIONS AND NOT NEEDED 
    )} 
    catch (err) {
        console.error(err)
    }
}

module.exports = connectDB