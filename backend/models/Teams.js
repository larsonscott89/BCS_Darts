const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
  {
    league_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Leagues', required: true },
    team_name: { type: String, required: true },
    team_captain: { type: String, required: true },
    captain_cell_number: { type: String, required: true }, // Add captain's call number
    captain_email: { type: String, required: true }, // Add captain's email
    other_team_members: [{
      name: { type: String, required: true },
      cell_number: { type: String, required: false },
      email: { type: String, required: false }
    }]
  },
  { timestamps: true }
)

const Teams = mongoose.model('Teams', teamSchema)

module.exports = Teams