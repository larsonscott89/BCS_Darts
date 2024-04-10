const Home = require('../models/Home');

// Controller to get all posts
const getAllHome = async (req, res) => {
  try {
    const home = await Home.find();
    res.json(home);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const home = await Home.findById(id);
    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }
    res.json(home);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller to create a new post
const createHome = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newHome = new Home({ title, content, author: req.session._id });
    await newHome.save();
    res.status(201).json(newHome);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a post
const updateHome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedHome = await Home.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedHome) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedHome);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a post
const deleteHome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHome = await Home.findByIdAndDelete(id);
    if (!deletedHome) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllHome,
  createHome,
  updateHome,
  deleteHome,
  getHomeById
};