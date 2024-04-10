const express = require('express');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan')
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3001;
const db = require('./db');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const leagueController = require('./controllers/Leagues');
const teamController = require('./controllers/Teams');
const playerController = require('./controllers/Players');
const sublistController = require('./controllers/Sublist');
const scoresheetController = require('./controllers/Scoresheet');
const userController = require('./controllers/Users');
const homeController = require('./controllers/Home');
const Users = require('./models/Users');
const { JWT_SECRET } = require('./config');

const app = express();

app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'))

app.use(session({
  secret: 'Password123987!',
  resave: false,
  saveUninitialized: false,
}));

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Invalid username or password');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '3h' });
    console.log('Token generated successfully:', token);

    res.json({ token, user });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Protected route that requires JWT authentication
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

const checkAdminAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    Users.findById(req.session.userId, (err, user) => {
      if (err || !user || user.role !== "admin") {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      next();
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

// Create
app.post('/leagues', leagueController.createLeague);
app.post('/teams', teamController.createTeam);
app.post('/players', playerController.createPlayer);
app.post('/sublist', sublistController.createSublist);
app.post('/scoresheet', scoresheetController.createScoresheet);
app.post('/users/signup', userController.createUser);
app.post('/users/login', userController.loginUser);

// Read
app.get('/leagues', leagueController.getLeague);
app.get('/leagues/:id', leagueController.getLeagueById);
app.get('/teams', teamController.getTeams);
app.get('/teams/:id', teamController.getTeamById);
app.get('/players', playerController.getPlayer);
app.get('/sublist', sublistController.getSublist);
app.get('/scoresheet', scoresheetController.getScoresheet);
app.get('/user', userController.getUser);

// Update
app.put('/leagues/:id', leagueController.updateLeague);
app.put('/teams/:id', teamController.updateTeam);
app.put('/players/:id', playerController.updatePlayer);
app.put('/sublist/:id', sublistController.updateSublist);
app.put('/scoresheet/:id', scoresheetController.updateScoresheet);
app.put('/user/:id', userController.updateUser);

// Delete
app.delete('/leagues/:id', leagueController.deleteLeague);
app.delete('/teams/:id', teamController.deleteTeam);
app.delete('/players/:id', playerController.deletePlayer);
app.delete('/sublist/:id', sublistController.deleteSublist);
app.delete('/scoresheet/:id', scoresheetController.deleteScoresheet);
app.delete('/user/:id', userController.deleteUser);

app.patch('/admin/promote/:id', checkAdminAuth, userController.promoteToAdmin);

// Home functionality 
app.post('/home', checkAdminAuth, homeController.createHome);
app.get('/home', homeController.getAllHome);
app.get('/home/:id', homeController.getHomeById);
app.put('/home/:id', checkAdminAuth, homeController.updateHome);
app.delete('/home/:id', checkAdminAuth, homeController.deleteHome);

app.get('/*', async (req,res) => {
  res.send('An error has occurred. Try again later (404)');
})