const fs = require('fs')
const path = require('path')

fs.readFile('./t2/starter.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log("FILE NAME", data.toString())
})

// gets logged first due to async nature of the readfile
console.log("Hello")

//if you hardcode path names with the ./ syntax there can be some delay / problems. using path rectifies this.

fs.readFile(path.join(__dirname, 'starter.txt'), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log("PATH", data.toString())
})

fs.writeFile(path.join(__dirname, 'reply.txt'), "Nice to meet you", (err) => {
    if (err) throw err;
    console.log("Write Complete")

    fs.appendFile(path.join(__dirname, 'reply.txt'), "\n\nYes it is", (err) => {
        if (err) throw err;
        console.log("Append Complete")

        fs.rename(path.join(__dirname, 'reply.txt'), path.join(__dirname, "newReply.txt"), (err) => {
            if (err) throw err;
            console.log("Rename Complete")
        })
    })
})

// above is callback hell due to asynchronous nature of JS you are not sure which will run first. Better to use async await (see index2 file for more info)



process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1)
})