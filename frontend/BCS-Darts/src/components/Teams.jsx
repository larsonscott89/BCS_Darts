import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Team() {
  const [teams, setTeams] = useState([])
  const [leagues, setLeagues] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:3001/teams')
        const leaguesResponse = await axios.get('http://localhost:3001/leagues')
        setTeams(teamsResponse.data)
        setLeagues(leaguesResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || teams.length === 0 || leagues.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className='teams-container'>
        <div>
          <h1 className='teams-label'>Teams</h1>
          {teams.map((team, index) => {
            const foundLeague = leagues.find((league) => league._id === team.league_id)
            return (
              <div className='team-list' key={index}>
                <h1 className='team-names'>{team.team_name}</h1>
                <h3 className='league-title'>
                  League: {foundLeague ? foundLeague.league_name : 'Unknown League'}
                </h3>
                <h5 className='team-captain-label'>Team Captain:</h5>
                <div>
                  <div className='captain-name'>{team.members.find((member) => member.is_captain)?.name}</div>
                  {team.members.find((member) => member.is_captain)?.cell_number && (
                    <div>Cell Number: {team.members.find((member) => member.is_captain).cell_number}</div>
                  )}
                  {team.members.find((member) => member.is_captain)?.email && (
                    <div>Email: {team.members.find((member) => member.is_captain).email}</div>
                  )}
                </div>
                <h5 className='team-members-label'>Team Members:</h5>
                {team.members && team.members.length > 0 ? (
                  <div className='team-members'>
                    {team.members.map((teamMember, idx) => (
                      <div key={idx}>
                        {teamMember.name}
                        <div className='team-cell-email'>
                        {teamMember.cell_number && <span> Cell Number: {teamMember.cell_number}</span>}
                        {teamMember.email && <span> - Email: {teamMember.email}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No team members</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
  )
}