const Players = require('../models/Players')

const getPlayer = async (req, res) => {
  try {
    const players = await Players.find()
    res.json(players)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getPlayer
}