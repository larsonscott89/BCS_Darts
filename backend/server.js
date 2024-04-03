const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const db = require('./db')
const leagueController = require('./controllers/Leagues')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is root!')
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

// Read
app.get('/leagues', leagueController.getLeague)

app.get('/*', async (req,res) => {
  res.send('An error has occurred. Try again later (404)')
})