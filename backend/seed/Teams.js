const db = require('../db')
const Teams = require('../models/Teams')

db.on('error', (error) => {
  console.error('MogoDB connection error:', error);
})

const main = async () => {
  const teams = [
    {
      league_id: '660d5c88a7eec8c81fa70631',
      team_name: 'One Last Ride',
      team_captain: 'Scott Larson',
      other_team_members: ['Malerie Larson, Billy Walters, Mike Youngs']
    },
  ]
  await Teams.insertMany(teams)
  console.log('Created teams')
}

const run = async () => {
  await main()
    db.close()
}

run()