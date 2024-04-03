const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
  {
    league_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Leagues', required: true},
    team_name: {type: String, required: true},
    team_captain: {type: String, required: true},
    other_team_members: [{type: String, required: true}]
  },
  {timestamps: true}
)

const Teams = mongoose.model('Teams', teamSchema)

module.exports = Teams