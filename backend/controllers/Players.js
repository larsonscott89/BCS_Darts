const Players = require('../models/Players')
const Teams = require('../models/Teams')

const createPlayer = async (req, res) => {
  try {
    const players = await new Players(req.body)
    await players.save()
    return res.status(201).json({
        players
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
  }

  const getPlayer = async (req, res) => {
    try {
      const allTeams = await Teams.find();
      const uniquePlayersMap = new Map();
  
      allTeams.forEach(team => {
        const captainName = team.team_captain;
        if (!uniquePlayersMap.has(captainName)) {
          uniquePlayersMap.set(captainName, { name: captainName });
        }
  
        team.other_team_members.forEach(memberName => {
          if (!uniquePlayersMap.has(memberName)) {
            uniquePlayersMap.set(memberName, { name: memberName });
          }
        });
      });
  
      const uniquePlayers = Array.from(uniquePlayersMap.values());
  
      res.json(uniquePlayers);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

const updatePlayer = async (req, res) => {
  try {
    let { id } = req.params
    let players = await Players.findByIdAndUpdate(id, req.body, { new: true})
    if (players) {
      return res.status(200).json(players)
    }
  } catch (e) {
    return res.status(500).json({ error: error.message})
  }
}

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Players.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('player deleted')
    }
    throw new Error('player not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createPlayer,
  getPlayer,
  updatePlayer,
  deletePlayer
}