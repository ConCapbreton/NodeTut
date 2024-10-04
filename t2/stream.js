
const fs = require('fs')
const rs = fs.createReadStream('./t2/lorem.txt', {encoding: 'utf8'})

const ws = fs.createWriteStream('./t2/new-lorem.txt')

// more efficient using rs when working with lots of text
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

// even more efficient
rs.pipe(ws)

