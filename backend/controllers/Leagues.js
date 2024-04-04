const mongoose = require('mongoose')
const Leagues = require('../models/Leagues')

const createLeague = async (req, res) => {
  try {
    const leagues = await new Leagues(req.body)
    await leagues.save()
    return res.status(201).json({
        leagues
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  }

const getLeague = async (req, res) => {
  try {
    const leagues = await Leagues.find()
    res.json(leagues)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getLeagueById = async (req,res) => {
  try {
      const league = await Leagues.findById(req.params.id).populate()
      if (league) {
          res.json(league)
      }
  } catch (error) {
      return res.status(500).send('Collection with the specified ID does not exists');
  }
}

const updateLeague = async (req, res) => {
  try {
    let { id } = req.params
    let leagues = await Leagues.findByIdAndUpdate(id, req.body, { new: true})
    if (leagues) {
      return res.status(200).json(leagues)
    }
  } catch (e) {
    return res.status(500).json({ error: error.message})
  }
}

const deleteLeague = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Leagues.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('League deleted')
    }
    throw new Error('League not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getLeague,
  createLeague,
  updateLeague,
  deleteLeague,
  getLeagueById
}