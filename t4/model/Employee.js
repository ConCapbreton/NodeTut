const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema) //Mongoose will set Employees to lower case and add an s for the plural and in MongoDB will look for employees