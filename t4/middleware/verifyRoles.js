const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401) //unauthorised
        const rolesArray = [...allowedRoles]
        // console.log(rolesArray) 
        // console.log(req.roles) // come from JWT
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true) // map returns an array with a boolean for each role that is being looked for from the JWT. then uses find to see if there is a true value (at least 1 true value)
        if (!result) return res.sendStatus(401) // unauthorised - no true values for roles
        next() 
    }
}

module.exports = verifyRoles