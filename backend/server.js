const express = require('express')
const cors = require('cors')
const session = require('express-session')
const PORT = process.env.PORT || 3001
const db = require('./db')
const bodyParser = require('body-parser')
const leagueController = require('./controllers/Leagues')
const teamController = require('./controllers/Teams')
const playerController = require('./controllers/Players')
const sublistController = require('./controllers/Sublist')
const scoresheetController = require('./controllers/Scoresheet')
const userController = require('./controllers/Users')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use(session({
  secret: 'Password123987!',
  resave: false,
  saveUninitialized: false,
}))

app.get('/', (req, res) => {
  res.send('This is root!')
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

// Create
app.post('/leagues', leagueController.createLeague)
app.post('/teams', teamController.createTeam)
app.post('/players', playerController.createPlayer)
app.post('/sublist', sublistController.createSublist)
app.post('/scoresheet', scoresheetController.createScoresheet)
app.post('/users/signup', userController.createUser)
app.post('/users/login', userController.loginUser)

// Read
app.get('/leagues', leagueController.getLeague)
app.get('/leagues/:id', leagueController.getLeagueById)
app.get('/teams', teamController.getTeams)
app.get('/teams/:id', teamController.getTeamById)
app.get('/players', playerController.getPlayer)
app.get('/sublist', sublistController.getSublist)
app.get('/scoresheet', scoresheetController.getScoresheet)
app.get('/user', userController.getUser)

// Update
app.put('/leagues/:id', leagueController.updateLeague)
app.put('/teams/:id', teamController.updateTeam)
app.put('/players/:id', playerController.updatePlayer)
app.put('/sublist/:id', sublistController.updateSublist)
app.put('/scoresheet/:id', scoresheetController.updateScoresheet)
app.put('/user/:id', userController.updateUser)

// Delete
app.delete('/leagues/:id', leagueController.deleteLeague)
app.delete('/teams/:id', teamController.deleteTeam)
app.delete('/players/:id', playerController.deletePlayer)
app.delete('/sublist/:id', sublistController.deleteSublist)
app.delete('/scoresheet/:id', scoresheetController.deleteScoresheet)
app.delete('/user/:id', userController.deleteUser)

app.patch('/users/:id', userController.promoteToAdmin)


app.get('/*', async (req,res) => {
  res.send('An error has occurred. Try again later (404)')
})