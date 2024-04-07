const mongoose = require('mongoose');

const scoresheetSchema = new mongoose.Schema(
  {
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, 
    league_id: { type: mongoose.Schema.Types.ObjectId, ref: 'League' }, 
    games: [
      {
        game_type: { type: String, enum: ['501', 'cricket', 'doubles_cricket', 'team_701'], required: true },
        winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        loser: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        match_result: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }],
        quality_points: { type: Number, required: false },
        number_of_darts: { type: Number, required: false },
        points_left: { type: Number, required: false },
        white_hat: { type: String, required: false }
      }
    ],
    scoresheet_picture: { type: String, required: true }
  },
  { timestamps: true }
);

const Scoresheet = mongoose.model('Scoresheet', scoresheetSchema);

module.exports = Scoresheet;