const mongoose = require('mongoose')

const scoresheet = new mongoose.Schema(
  {
    team_id: '6611e7565e664ba516e98f08',
    league_id: '660d5c88a7eec8c81fa70631',
    games: [
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f09',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f0a',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f0b',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6612e5fe5e664ba516e9901c',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f09',
        white_hat: ''
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f0a',
        white_hat: ''
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f0b',
        white_hat: ''
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6612e5fe5e664ba516e9901c',
        white_hat: ''
      },
      {
        game_type: 'doubles_cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f09',
        match_result: '6611e7565e664ba516e98f0a',
        white_hat: ''
      },
      {
        game_type: 'doubles_cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f0b',
        match_result: '6612e5fe5e664ba516e9901c',
        white_hat: ''
      },
      {
        game_type: 'team_701',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6611e7565e664ba516e98f09',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '6611e7565e664ba516e98f0a',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '6611e7565e664ba516e98f0b',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '6612e5fe5e664ba516e9901c',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        
      }
      // Add more games as needed
    ],
    scoresheet_picture: 'path/to/picture1.jpg',
  },
  {
    team_id: '6613180ead76e340f64e52fe',
    league_id: '660d5c88a7eec8c81fa70631',
    games: [
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e52ff',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e5300',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e5301',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: '501',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6612e5fe5e664ba516e9901d',
        quality_points: 10,
        number_of_darts: 30,
        points_left: 100,
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e52ff',
        white_hat: ''
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e5300',
        white_hat: ''
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e5301',
        white_hat: ''
      },
      {
        game_type: 'cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6612e5fe5e664ba516e9901d',
        white_hat: ''
      },
      {
        game_type: 'doubles_cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e52ff',
        match_result: '6613180ead76e340f64e5300',
        white_hat: ''
      },
      {
        game_type: 'doubles_cricket',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e5301',
        match_result: '6612e5fe5e664ba516e9901d',
        white_hat: ''
      },
      {
        game_type: 'team_701',
        winner: '6611e7565e664ba516e98f08',
        loser: '6613180ead76e340f64e52fe',
        match_result: '6613180ead76e340f64e52ff',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '6613180ead76e340f64e5300',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '6613180ead76e340f64e5301',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        match_result: '6612e5fe5e664ba516e9901d',
        quality_points: 100,
        number_of_darts: 42,
        points_left: 0,
        
      }
    ],
  },
  { timestamps: true }
)

const Scoresheet = mongoose.model('Scoresheet', scoresheet)

module.exports = Scoresheet