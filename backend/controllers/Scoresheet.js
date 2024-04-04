const Scoresheet = require('../models/Scoresheet')

const createScoresheet = async (req, res) => {
  try {
    const scoresheets = await new Scoresheet(req.body)
    await scoresheets.save()
    return res.status(201).json({
        scoresheets
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  }

const getScoresheet = async (req, res) => {
  try {
    const scoresheet = await Scoresheet.find()
    res.json(scoresheet)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateScoresheet = async (req, res) => {
  try {
    let { id } = req.params
    let scoresheets = await Scoresheet.findByIdAndUpdate(id, req.body, { new: true})
    if (scoresheets) {
      return res.status(200).json(scoresheets)
    }
  } catch (e) {
    return res.status(500).json({ error: error.message})
  }
}

const deleteScoresheet = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Scoresheet.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('scoresheet deleted')
    }
    throw new Error('scoresheet not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createScoresheet,
  getScoresheet,
  updateScoresheet,
  deleteScoresheet
}