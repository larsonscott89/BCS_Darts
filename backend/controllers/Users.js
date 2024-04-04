const Users = require('../models/Users')

const getUser = async (req, res) => {
  try {
    const user = await Users.find()
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  getUser
}