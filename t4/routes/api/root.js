const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// router.get('/new-page(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname,  '..', 'views', 'new-page.html'))
// })

// router.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301, 'new-page.html') // sends 302 by default so need to specify 301 for a permanent re-direct  
// })

module.exports = router