const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    game_type: {type: String, enum: ['501', 'cricket', 'doubles_cricket', 'team_701'], required: true},
    winner: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
    loser: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
    match_result: {type: mongoose.Schema.Types.ObjectId, ref: 'Players', required: true},
    quality_points: {type: Number},
    number_of_darts: {type: Number},
    points_left: {type: Number}
})

const ScoresheetSchema = new mongoose.Schema({
    team_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Teams', required: true},
    league_id: {type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true},
    games: [GameSchema],
    scoresheet_picture: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Scoresheet', ScoresheetSchema)