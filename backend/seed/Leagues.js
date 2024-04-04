const db = require('../db')
const Leagues = require('../models/Leagues')

db.on('error', (error) => {
  console.error('MogoDB connection error:', error);
})

const main = async () => {
  const leagues = [
    {
      league_name: 'A-League',
      number_of_players: 4,
      season: 'Summer 2024'
    },
    {
      league_name: 'B&P',
      number_of_players: 4,
      season: 'Summer 2024'
    },
    {
      league_name: 'Miced Doubles',
      number_of_players: 2,
      season: 'Summer 2024'
    },
    {
      league_name: 'B&P Doubles',
      number_of_players: 2,
      season: 'Summer 2024'
    },
    {
      league_name: `Women's League`,
      number_of_players: 4,
      season: 'Summer 2024'
    },
    {
      league_name: 'Open Doubles',
      number_of_players: 2,
      season: 'Summer 2024'
    },
  ]
  await Leagues.insertMany(leagues)
  console.log('Created leagues')
}

const run = async () => {
  await main()
    db.close()
}

run()