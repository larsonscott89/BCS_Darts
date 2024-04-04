const Teams = require('../models/Teams')

const createTeam = async (req, res) => {
  try {
    const teams = await new Teams(req.body)
    await teams.save()
    return res.status(201).json({
        teams
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  }

const getTeams = async (req, res) => {
  try {
    const teams = await Teams.find()
    res.json(teams)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateTeam = async (req, res) => {
  try {
    let { id } = req.params
    let teams = await Teams.findByIdAndUpdate(id, req.body, { new: true})
    if (teams) {
      return res.status(200).json(teams)
    }
  } catch (e) {
    return res.status(500).json({ error: error.message})
  }
}

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Teams.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('team deleted')
    }
    throw new Error('team not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam
}