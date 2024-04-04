const Sublist = require('../models/Sublist')

const createSublist = async (req, res) => {
  try {
    const sublist = await new Sublist(req.body)
    await sublist.save()
    return res.status(201).json({
        sublist
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  }

const getSublist = async (req, res) => {
  try {
    const sublist = await Sublist.find()
    res.json(sublist)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateSublist = async (req, res) => {
  try {
    let { id } = req.params
    let sublist = await Sublist.findByIdAndUpdate(id, req.body, { new: true})
    if (sublist) {
      return res.status(200).json(sublist)
    }
  } catch (e) {
    return res.status(500).json({ error: error.message})
  }
}

const deleteSublist = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Sublist.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('sublist deleted')
    }
    throw new Error('sublist not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createSublist,
  getSublist,
  updateSublist,
  deleteSublist
}