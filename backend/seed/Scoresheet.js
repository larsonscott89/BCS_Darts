const db = require('../db')
const Scoresheet = require('../models/Scoresheet')

const main = async () => {
const scoresheet = [
  {
    team_id: '661347d061f8d664b0595914',
    league_id: '660d5c88a7eec8c81fa70631',
    games: [
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595915',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595916',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595917',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595918',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595915',
        white_hat: 'hat'
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595916',
        white_hat: 'hat'
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595917',
        white_hat: 'white'
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595918',
        white_hat: 'hat'
      },
      {
        game_type: 'doubles_cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595915',
        match_result: '661347d061f8d664b0595916',
      },
      {
        game_type: 'doubles_cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595917',
        match_result: '661347d061f8d664b0595918',
      },
      {
        game_type: 'team_701',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '661347d061f8d664b0595915',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '661347d061f8d664b0595916',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '661347d061f8d664b0595917',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '661347d061f8d664b0595918',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        
      }
    ],
  },
  {
    team_id: '661347d061f8d664b0595914',
    league_id: '660d5c88a7eec8c81fa70631',
    games: [
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3863',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3864',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3865',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3866',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3863',
   
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3864',
   
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3865',
   
      },
      {
        game_type: 'cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3866',
   
      },
      {
        game_type: 'doubles_cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3863',
        match_result: '66134b3c290b700f230c3864',
   
      },
      {
        game_type: 'doubles_cricket',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3865',
        match_result: '66134b3c290b700f230c3866',
   
      },
      {
        game_type: 'team_701',
        winner: '661347d061f8d664b0595914',
        loser: '66134b3c290b700f230c3862',
        match_result: '66134b3c290b700f230c3863',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '66134b3c290b700f230c3864',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '66134b3c290b700f230c3865',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '66134b3c290b700f230c3866',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        
      }
    ],
  }
]
const options = { bufferTimeoutMS: 30000 }
await Scoresheet.insertMany(scoresheet, options);
  console.log('Created scoresheets');
};

const run = async () => {
  await main();
  db.close();
};

run();
