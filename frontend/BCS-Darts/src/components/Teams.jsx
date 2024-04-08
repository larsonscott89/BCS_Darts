import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Team() {
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:3001/teams');
        const leaguesResponse = await axios.get('http://localhost:3001/leagues');
        setTeams(teamsResponse.data);
        setLeagues(leaguesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || teams.length === 0 || leagues.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Teams</h1>
      <div>
        {teams.map((team, index) => {
          const foundLeague = leagues.find((league) => league._id === team.league_id);
          return (
            <div className='team-list' key={index}>
              <h1>{team.team_name}</h1>
              <h3>
                League: {foundLeague ? foundLeague.league_name : 'Unknown League'}
              </h3>
              <h5>Team Captain:</h5>
              <ul>
                <li>{team.members.find((member) => member.is_captain)?.name}</li>
                {team.members.find((member) => member.is_captain)?.cell_number && (
                  <li>Cell Number: {team.members.find((member) => member.is_captain).cell_number}</li>
                )}
                {team.members.find((member) => member.is_captain)?.email && (
                  <li>Email: {team.members.find((member) => member.is_captain).email}</li>
                )}
              </ul>
              <h5>Team Members:</h5>
              {team.members && team.members.length > 0 ? (
                <ul>
                  {team.members.map((teamMember, idx) => (
                    <li key={idx}>
                      {teamMember.name}
                      {teamMember.cell_number && <span> - Cell Number: {teamMember.cell_number}</span>}
                      {teamMember.email && <span> - Email: {teamMember.email}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No team members</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}