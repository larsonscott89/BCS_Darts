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
    <div>
      <h1>Leagues</h1>
      <div>
        {leagues.map((league, index) => (
          <div className='league list' key={index}>
            <h2>{league.league_name}</h2>
            <p>Number of players: {league.number_of_players}</p>
            <p>Season: {league.season}</p>
          </div>
        ))}
      </div>
    </div>
  )
}