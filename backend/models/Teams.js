const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
  {
    league_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Leagues', required: true },
    team_name: { type: String, required: true },
    members: [{
      name: { type: String, required: true },
      cell_number: { type: String, required: false },
      email: { type: String, required: false },
      is_captain: { type: Boolean, default: false }
    }]
  },
  { timestamps: true }
)

const Team = mongoose.model('Team', teamSchema)

module.exports = Team