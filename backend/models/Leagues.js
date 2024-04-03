const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
    league_name: {type: String, required: true},
    number_of_players: {type: Number, required: true},
    season: {type: String, required: false}
},
{timestamps: true})

const Leagues = mongoose.model('Leagues', leagueSchema)

module.exports = Leagues