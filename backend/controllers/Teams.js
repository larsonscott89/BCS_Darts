const Teams = require('../models/Teams')

const getTeams = async (req, res) => {
  try {
    const teams = await Teams.find()
    res.json(teams)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getTeams
}