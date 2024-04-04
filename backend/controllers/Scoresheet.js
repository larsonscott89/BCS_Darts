const Scoresheet = require('../models/Scoresheet')

const getScoresheet = async (req, res) => {
  try {
    const scoresheet = await Scoresheet.find()
    res.json(scoresheet)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getScoresheet
}