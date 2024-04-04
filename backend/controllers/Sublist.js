const Sublist = require('../models/Sublist')

const getSublist = async (req, res) => {
  try {
    const sublist = await Sublist.find()
    res.json(sublist)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getSublist
}