import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Players() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:3001/teams')
        setTeams(teamsResponse.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching teams:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || teams.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className='players-container'>
      <div>
      <h1 className='players-label'>Players</h1>
        {teams.map((team, index) => (
          <div className='players-captain' key={team._id || index}>
            <h4 className='player-name'>{team.team_captain}</h4>
            {team.captain_cell_number && <h4 className='player-cell'>Cell Number: {team.captain_cell_number}</h4>}
            {team.captain_email && <h4 className='player-email'>Email: {team.captain_email}</h4>}
            {team.members && team.members.length > 0 ? (
              <div className='players-member'>
                {team.members.map((player, idx) => (
                  <div key={player._id || idx}>
                    <h4 className='player-name'>{player.name}</h4>
                    {player.cell_number && <h4 className='player-cell'>Cell Number: {player.cell_number}</h4>}
                    {player.email && <h4 className='player-email'>Email: {player.email}</h4>}
                  </div>
                ))}
              </div>
            ) : (
              <p>No players in this team</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}