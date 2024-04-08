import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Players() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:3001/teams');
        setTeams(teamsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || teams.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Players</h1>
      <div>
        {teams.map((team, index) => (
          <div key={team._id || index}>
            <h2>{team.team_name}</h2>
            <h3>Team Captain:</h3>
            <h4>{team.team_captain}</h4>
            {team.captain_cell_number && <h4>Cell Number: {team.captain_cell_number}</h4>}
            {team.captain_email && <h4>Email: {team.captain_email}</h4>}
            <h4>Players:</h4>
            {team.members && team.members.length > 0 ? (
              <div>
                {team.members.map((player, idx) => (
                  <div key={player._id || idx}>
                    <h4>{player.name}</h4>
                    {player.cell_number && <h4>Cell Number: {player.cell_number}</h4>}
                    {player.email && <h4>Email: {player.email}</h4>}
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
  );
}