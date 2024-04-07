import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    league_id: '',
    team_name: '',
    team_captain: '',
    captain_cell_number: '',
    captain_email: '',
    other_team_members: [{ name: '', cell_number: '', email: '' }]
  });
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('http://localhost:3001/leagues');
        setLeagues(response.data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    if (formData.league_id !== '') {
      const selectedLeague = leagues.find(league => league._id === formData.league_id);
      const numberOfPlayers = selectedLeague ? selectedLeague.number_of_players : 0;
      const initialTeamMembers = Array.from({ length: numberOfPlayers - 1 }, () => ({ name: '', cell_number: '', email: '' }));
      setFormData(prevState => ({
        ...prevState,
        other_team_members: initialTeamMembers
      }));
    }
  }, [formData.league_id, leagues]);

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field === 'name' || field === 'cell_number' || field === 'email') {
      const updatedTeamMembers = [...formData.other_team_members];
      updatedTeamMembers[index][field] = value;
      setFormData(prevState => ({
        ...prevState,
        other_team_members: updatedTeamMembers
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTeamMemberNameChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTeamMembers = [...formData.other_team_members];
    updatedTeamMembers[index][name] = value;
    setFormData(prevState => ({
      ...prevState,
      other_team_members: updatedTeamMembers
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.league_id === '' || formData.team_name === '' || formData.team_captain === '' || formData.other_team_members.some(member => member.name === '')) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/teams', formData);
      console.log('Team signed up successfully:', response.data);

      setFormData({
        league_id: '',
        team_name: '',
        team_captain: '',
        captain_cell_number: '',
        captain_email: '',
        other_team_members: [{ name: '', cell_number: '', email: '' }]
      });
    } catch (error) {
      console.error('Error signing up team:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Team Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="league_id">Select League:</label>
          <select
            id="league_id"
            name="league_id"
            value={formData.league_id}
            onChange={(e) => setFormData({ ...formData, league_id: e.target.value })}
          >
            <option value="">Select a League</option>
            {leagues.map((league) => (
              <option key={league._id} value={league._id}>
                {league.league_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="team_name">Team Name:</label>
          <input
            type="text"
            id="team_name"
            name="team_name"
            value={formData.team_name}
            onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="team_captain">Team Captain:</label>
          <input
            type="text"
            id="team_captain"
            name="team_captain"
            value={formData.team_captain}
            onChange={(e) => setFormData({ ...formData, team_captain: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="captain_cell_number">Captain's Cell Number:</label>
          <input
            type="text"
            id="captain_cell_number"
            name="captain_cell_number"
            value={formData.captain_cell_number}
            onChange={(e) => setFormData({ ...formData, captain_cell_number: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="captain_email">Captain's Email:</label>
          <input
            type="email"
            id="captain_email"
            name="captain_email"
            value={formData.captain_email}
            onChange={(e) => setFormData({ ...formData, captain_email: e.target.value })}
          />
        </div>
        <label>Team Members:</label>
        {formData.other_team_members.map((member, index) => (
          <div key={index}>
            <label htmlFor={`team_member_${index}`}>Team Member {index + 1} Name:</label>
            <input
              type="text"
              id={`team_member_${index}`}
              name="name"  // <-- Make sure the name attribute is set to "name"
              value={member.name}
              onChange={(e) => handleTeamMemberNameChange(e, index)}
            />
            <input
              type="text"
              value={member.cell_number}
              onChange={(e) => handleChange(e, index, 'cell_number')}
              name={`other_team_members_cell_${index}`}
              placeholder={`Team Member ${index + 1} Cell Number`}
            />
            <input
              type="email"
              value={member.email}
              onChange={(e) => handleChange(e, index, 'email')}
              name={`other_team_members_email_${index}`}
              placeholder={`Team Member ${index + 1} Email`}
            />
          </div>
        ))}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
