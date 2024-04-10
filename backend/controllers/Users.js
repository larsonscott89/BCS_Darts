const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
  } catch (error) {
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

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    try {
      console.log('Generating token...');
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      console.log('Token generated successfully:', token);
      req.session._id = user._id;
      req.session.username = user.username;
      user.password = null;
      console.log('User Object:', user);
      // Send token and user object in response
      return res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error generating token:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const promoteToAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.role = 'admin';
    await user.save();
    return res.status(200).json({ message: 'User promoted to admin successfully', user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  promoteToAdmin,
  loginUser
}