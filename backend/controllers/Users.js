const Users = require('../models/Users')

const createUser = async (req, res) => {
  try {
    const users = await new Users(req.body)
    await users.save()
    return res.status(201).json({
        users
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  }

const getUser = async (req, res) => {
  try {
    const user = await Users.find()
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateUser = async (req, res) => {
  try {
    let { id } = req.params
    let users = await Users.findByIdAndUpdate(id, req.body, { new: true})
    if (users) {
      return res.status(200).json(users)
    }
  } catch (e) {
    return res.status(500).json({ error: error.message})
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Users.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('user deleted')
    }
    throw new Error('user not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const promoteToAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const user = await Users.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    user.role = 'admin'
    await user.save()
    return res.status(200).json({ message: 'User promoted to admin successfully', user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  promoteToAdmin
}