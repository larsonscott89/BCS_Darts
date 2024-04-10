const db= require('../db/index')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    try {
        const existingAdmin = await Users.findOne({ username: 'slarson0305' });
        if (existingAdmin) {
          console.log('Admin user already exists.');
          return;
        }
    
        const hashedPassword = await bcrypt.hash('7u8j9kolI!', 10);
    
        const adminUser = new Users({
          username: 'slarson0305',
          password: hashedPassword,
          role: 'admin'
        });
    
        await adminUser.save();
        console.log('Admin user seeded successfully.');
      } catch (error) {
        console.error('Error seeding admin user:', error.message);
      }
    }

const run = async () => {
    await main()
    db.close()
}

run()