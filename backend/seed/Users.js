const db= require('../db/index')
const Users = require('../models/Users')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    const user =[{
      username: 'slarson',
      password: '7u8j9kolI!',
      role: 'admin'
}]
    await Users.insertMany(user)
    console.log("Created new User!")
}
const run = async () => {
    await main()
    db.close()
}

run()