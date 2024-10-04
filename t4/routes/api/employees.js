const express = require('express')
const router = express.Router()
// const path = require('path')
// const data = {}
// data.employees = require('../../data/employees.json') // up out of the api folder and up out of the routes folder and then into data and the employees file
// in the future we will work on connecting to Mongo but for the tutorial we will just work on local json
const employeesController = require('../../controllers/employeesController')
// const verifyJWT = require('../../middleware/verifyJWT')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    //read
    .get(employeesController.getAllEmployees) // can add verifyJWT, before employeesCont... if you only want to protect this route (or selected routes) - import above if this is your intention (we moved it to the server file)
    //create
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee) // verifyRoles(place the roles that you want to allow on this route here - the middleware will check the user has those roles)
    //update
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee)


router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router

