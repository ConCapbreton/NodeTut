const fs = require('fs')

if (!fs.existsSync('./new')) {
    //make directory (mkdir) if it doesnt exist
    fs.mkdir('./new', (err) => {
        if (err) throw err
        console.log('Directory created')
    })

}
if (fs.existsSync('./new')) {
    //remove directory (mkdir) if it exists
    fs.rmdir('./new', (err) => {
        if (err) throw err
        console.log('Directory removed')
    })
}