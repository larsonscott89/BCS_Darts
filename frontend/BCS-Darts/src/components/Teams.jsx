import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Team () {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teams')
        setTeams(response.data)
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    }
    getTeams()
  }, [])
  return(
    <div>
      <h1>Teams</h1>
      <div>
        {teams.map((team, index) => (
          <div className='league list' key={index}>
            <h2>{team.team_name}</h2>
            <p>Team Captain: {team.team_captain}</p>
            <p>Team Members: {team.other_team_members}</p>
          </div>
        ))}
      </div>
    </div>
  )
}