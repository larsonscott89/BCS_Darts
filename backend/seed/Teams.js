const db = require('../db');
const Teams = require('../models/Teams');

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const main = async () => {
  const teams = [
    {
      league_id: '660d5c88a7eec8c81fa70631',
      team_name: 'One Last Ride',
      team_captain: 'Scott Larson',
      captain_cell_number: '832-206-2782',
      captain_email: 'larson.scott.96@gmail.com',
      other_team_members: [
        {
          name: 'Malerie Larson',
          cell_number: '',
          email: ''
        },
        {
          name: 'Billy Walters',
          cell_number: '',
          email: ''
        },
        {
          name: 'Mike Youngs',
          cell_number: '',
          email: ''
        }
      ]
    }
  ];
  
  await Teams.insertMany(teams);
  console.log('Created teams');
};

const run = async () => {
  await main();
  db.close();
};

run();