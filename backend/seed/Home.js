const db = require('../db');
const Home = require('../models/Home');

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const main = async () => {
  const home = [
    {
      title: 'First Post',
      content: 'This is the content of the first post.', 
    },
    {
      title: 'Second Post',
      content: 'This is the content of the second post.',
    },
  ];
  
      await Home.insertMany(home);
      console.log('Created home page');
}
 const run = async () => {
  await main()
  db.close()
 }

 run()

