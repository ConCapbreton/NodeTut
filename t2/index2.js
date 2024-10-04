// if you call this function it will delete the starter file - which will need to be recreated (starter.txt "Hello, my name is Connor")

const fsPromises = require('fs').promises
const path = require('path')

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'starter.txt'), 'utf8')
        console.log(data)
        await fsPromises.unlink(path.join(__dirname, 'starter.txt'))
        await fsPromises.writeFile(path.join(__dirname, 'promiseWrite.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'promiseWrite.txt'), '\n\nNice to meet you')
        await fsPromises.rename(path.join(__dirname, 'promiseWrite.txt'), path.join(__dirname, 'promiseComplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname, 'promiseComplete.txt'), 'utf8')
        console.log(newData)
    } catch (err) {
        console.error(err)
    }
}

fileOps()

