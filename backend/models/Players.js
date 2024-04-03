const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema(
  {
    teams_id: { type: mongoose.Schema.Types. ObjectId, ref: 'Teams', required: true },
    name: {type: String, required: true},
    cell_number: {type: String, required: false},
    email: {type: String, required: false},
    league_rank: {type: String, required: true}
  },
  {timestamps: true}
)

const Players = mongoose.model('Players', playerSchema)

module.exports = Players