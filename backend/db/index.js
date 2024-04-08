const mongoose = require('mongoose')

let uri = 'mongodb+srv://scottlarson0305:tZlxGbPF0w5iQ494@bcs-darts.izonpuu.mongodb.net/?retryWrites=true&w=majority&appName=BCS-Darts'

mongoose
    .connect(uri)
    
    .then(() => {
        console.log(`Successfully connected to ${uri}`)
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })


mongoose.set('debug', true)
const db = mongoose.connection

module.exports = db