const express = require('express')
const cors = require('cors')
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

app.get('/', (req, res) => {
  res.send('This is root!')
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

// Create
app.post('/leagues', leagueController.createLeague)

// Read
app.get('/leagues', leagueController.getLeague)
app.get('/teams', teamController.getTeams)
app.get('/players', playerController.getPlayer)
app.get('/sublist', sublistController.getSublist)
app.get('/scoresheet', scoresheetController.getScoresheet)
app.get('/user', userController.getUser)

// Update
app.put('/leagues/:id', leagueController.updateLeague)

// Delete
app.delete('/leagues/:id', leagueController.deleteLeague)


app.get('/*', async (req,res) => {
  res.send('An error has occurred. Try again later (404)')
})