const { id } = require('date-fns/locale')
const Employee = require('../model/Employee')


// const data = {
//     employees: require('../model/employees.json'),
//     setEmployees: function (data) { this.employees = data }
// }

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if (!employees) return res.status(204).json({'message': 'No employees found'})
    res.json(employees)
    // res.json(data.employees)
}

const createNewEmployee = async (req, res) => {
    // const newEmployee = {
    //     id: (Number (data.employees[data.employees.length - 1].id) + 1) || 1,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }
    // if (!newEmployee.firstname || ! newEmployee.lastname) {
    //     return res.status(400).json({'message': 'First and last names are required.'})
    // }

    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({'message': 'First and last names are required'}) // 400 = bad request
    }
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        res.status(201).json(result) // 201 = created
    }
    catch (err) {
        console.error(err)
    }

    
    // data.setEmployees([...data.employees, newEmployee])
    // res.status(201).json(data.employees)
}

const updateEmployee = async (req, res) => {
    // const employee = data.employees.find((emp) => (Number (emp.id)) === parseInt(req.body.id))
    // if (!employee) {
    //     return res.status(400).json({"message": `Employee ID ${req.body.id} not found`})
    // }

    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID paramter is required.'})
    }
    const employee = await Employee.findOne({ _id: req.body.id}).exec() //Mongo DN automatically creates and id and it starts with _
    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID ${req.body.id}`})
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname
    if (req.body?.lastname) employee.lastname = req.body.lastname
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    // const unsortedArray = [...filteredArray, employee]
    // data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    const result = await employee.save() //saved any changes made to the employee document
    // res.json(data.employees)
    res.json(result)
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({'message': 'Employee ID required'})
    const employee = await Employee.findOne({ _id: req.body.id}).exec()
    // const employee = data.employees.find(emp => (Number (emp.id)) === parseInt(req.body.id))
    // if (!employee) {
    //     return res.status(400).json({"message": `Employee ID ${req.body.id} not found`})
    // }
    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID ${req.body.id}`})
    }
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    // data.setEmployees([...filteredArray])
    // res.json(data.employees)
    const result = await employee.deleteOne({ _id: req.body.id}) // no exec() - for the reasons see docs
    res.json(result)
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'Employee ID required'})
    const employee = await Employee.findOne({ _id: req.params.id}).exec()
    
    // const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    // if (!employee) {
    //     return res.status(400).json({"message": `Employee ID ${req.params.id} not found`})
    // }
    if (!employee) {
        return res.status(204).json({"message": `No employee matches ID ${req.params.id} not found`})
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
