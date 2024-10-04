const logEvents = require('./LogEvents')

const EventEmitter = require('events')

// the below line looks strange but it is directly from the docs
class MyEmitter extends EventEmitter {}

// initialise the object
const myEmitter = new MyEmitter()

// add listener for the logEvent (this is any change to the code in this instance)

myEmitter.on('log', (msg) => {logEvents(msg)})

setTimeout(() => {
    //Emit Event
    myEmitter.emit('log', 'Log event emitted!')
}, 2000)