// NODE NOTES

// NODE RUNS ON A SERVER NOT IN THE BROWSER (BACKEND NOT FRONTEND)
// THE CONSOLE IS THE TERMINAL WINDOW
console.log("Hello World")
//GLOBAL OBJECT INSTEAD OF WINDOW OBJECT
// console.log(global)
// HAS COMMON CORE MODULES
// COMMON JS MODULES INSTEAD OF ES6 MODULUES
// MISSING SOME JS APIs like fetch

const os = require('os')
const path = require('path')
// const math = require('./math')
// console.log(math.add(2, 3))
const { add } = require('./math') 
console.log(add(2, 3)) // does the same as above, just destructuring
const { subtract, multiply, divide } = require('./math') 
console.log(subtract(2, 3))
console.log(multiply(2, 3))
console.log(divide(2, 3))

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())
// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))