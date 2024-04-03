const mongoose = require('mongoose')
const Leagues = require('../models/Leagues')

const getLeague = async (req, res) => {
  try {
    const leagues = await Leagues.find()
    res.json(leagues)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getLeague
}