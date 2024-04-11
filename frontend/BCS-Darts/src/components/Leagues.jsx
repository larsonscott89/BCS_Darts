import { useEffect, useState } from "react"
import axios from "axios"

export default function Leagues() {
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    const getLeague = async () => {
      try {
        const response = await axios.get('http://localhost:3001/leagues')
        setLeagues(response.data)
      } catch (error) {
        console.error('Error fetching leagues:', error)
      }
    }
    getLeague()
  }, [])

  return (
    <div className='league-container'>
      <div>
        <h1 className='league-label'>Leagues</h1>
        <div>
          {leagues.map((league, index) => (
            <div className='league-list' key={index}>
              <h2 className='league-name'>{league.league_name}</h2>
              <p className='number-players'>Number of players: {league.number_of_players}</p>
              <p className='season'>Season: {league.season}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}