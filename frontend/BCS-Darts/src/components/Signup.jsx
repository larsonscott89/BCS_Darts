import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Signup() {
  const [formData, setFormData] = useState({
    league_id: '',
    team_name: '',
    team_captain: '',
    other_team_members: []
  })
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('http://localhost:3001/leagues')
        setLeagues(response.data);
      } catch (error) {
        console.error('Error fetching leagues:', error)
      } finally {
        setIsLoading(false)
      }
    };

    fetchLeagues()
  }, [])

  useEffect(() => {
    if (formData.league_id !== '') {
      const selectedLeague = leagues.find(league => league._id === formData.league_id)
      setFormData(prevState => ({
        ...prevState,
        other_team_members: Array(selectedLeague.number_of_players - 1).fill('')
      }));
    }
  }, [formData.league_id, leagues])

  const handleChange = (e) => {
    if (e.target.name === 'other_team_members') {
      const updatedTeamMembers = [...formData.other_team_members]
      updatedTeamMembers[parseInt(e.target.dataset.index)] = e.target.value
      setFormData({ ...formData, other_team_members: updatedTeamMembers })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.league_id === '' || formData.team_name === '' || formData.team_captain === '' || formData.other_team_members.some(member => member === '')) {
      alert('Please fill in all required fields.')
      return
    }

    try {
      const response = await axios.post('http://localhost:3001/teams', formData)
      console.log('Team signed up successfully:', response.data)

      setFormData({
        league_id: '',
        team_name: '',
        team_captain: '',
        other_team_members: []
      });

    } catch (error) {
      console.error('Error signing up team:', error)
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="team_captain">Team Captain:</label>
          <input
            type="text"
            id="team_captain"
            name="team_captain"
            value={formData.team_captain}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Team Members:</label>
          {formData.other_team_members.map((member, index) => (
            <input
              type="text"
              key={index}
              value={member}
              data-index={index}
              onChange={handleChange}
              name="other_team_members"
              placeholder={`Team Member ${index + 1}`}
            />
          ))}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}