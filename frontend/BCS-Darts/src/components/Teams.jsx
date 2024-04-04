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
          const foundLeague = leagues.find(league => league._id === team.league_id);
          const teamMembers = Array.isArray(team.other_team_members) ? team.other_team_members : [team.other_team_members];
          return (
            <div className='team-list' key={index}>
              <h1>{team.team_name}</h1>
              <h3>
                League: {foundLeague ? foundLeague.league_name : 'Unknown League'}
              </h3>
              <h5>Team Captain: <li>{team.team_captain}</li></h5>
              <h5>Team Members:</h5>
              <h5>
                {teamMembers.map((teamMember, idx) => (
                  <div key={idx}>
                    {teamMember.split(',').map((name, index) => (
                      <li key={index}>{name.trim()}</li>
                    ))}
                  </div>
                ))}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}