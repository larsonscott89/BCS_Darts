const mongoose = require('mongoose')

const subListSchema = new mongoose.Schema(
  {
    league_id: { type: mongoose.Schema.Types. ObjectId, ref: 'Players', required: true},
    name: {type: String, required: true},
    cell_number: {type: String, required: false},
    email: {type: String, required: false},
    league_rank: {type: String, required: true}
  },
  {timestamps: true}
)

const SubList = mongoose.model('SubList', subListSchema)

module.exports = SubList