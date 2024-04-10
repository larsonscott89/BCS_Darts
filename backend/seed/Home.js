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
      author: '6615b24f860dfb43e680c914', 
    },
    {
      title: 'Second Post',
      content: 'This is the content of the second post.',
      author: '6615b24f860dfb43e680c914', 
    },
  ];
  
  const seedHome = async () => {
    try {
      // await Home.deleteMany();
  
      await Home.insertMany(home);
      console.log('Created home page');
    } catch (error) {
      console.error('Error seeding home page:', error.message);
    }
  };

  await seedHome();
};

main()