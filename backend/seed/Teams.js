const db = require('../db');
const Teams = require('../models/Teams');

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const main = async () => {
  const teams = [
    {
      league_id: '660d5c88a7eec8c81fa70631',
      team_name: 'Team 1',
      members: [
        { name: 'Member 1', cell_number: '123-456-7890', email: 'member1@example.com', is_captain: true },
        { name: 'Member 2', cell_number: '123-456-7891', email: 'member2@example.com', is_captain: false },
        { name: 'Member 3', cell_number: '123-456-7892', email: 'member3@example.com', is_captain: false },
        { name: 'Member 4', cell_number: '123-456-7893', email: 'member4@example.com', is_captain: false }
      ]
    },
  ]
  
  await Teams.insertMany(teams);
  console.log('Created teams');
};

const run = async () => {
  await main();
  db.close();
};

run();