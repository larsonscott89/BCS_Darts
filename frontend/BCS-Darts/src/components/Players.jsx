import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || players.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Players</h1>
      <div>
        {players.map((player, index) => (
          <div key={index}>
            <h3>{player.name}</h3>
            <p>Email: {player.email}</p>
            <p>Team: {player.team_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}