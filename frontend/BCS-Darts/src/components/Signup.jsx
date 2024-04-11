import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Signup() {
  const [formData, setFormData] = useState({
    league_id: '',
    team_name: '',
    members: [{ name: '', cell_number: '', email: '', is_captain: false }],
  });
  const [leagues, setLeagues] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('http://localhost:3001/leagues')
        setLeagues(response.data)
      } catch (error) {
        console.error('Error fetching leagues:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeagues()
  }, [])

  useEffect(() => {
    if (formData.league_id !== '') {
      const selectedLeague = leagues.find((league) => league._id === formData.league_id)
      const numberOfPlayers = selectedLeague ? selectedLeague.number_of_players : 0
      const initialMembers = Array.from({ length: numberOfPlayers }, () => ({
        name: '',
        cell_number: '',
        email: '',
        is_captain: false,
      }))
      setFormData((prevState) => ({
        ...prevState,
        members: initialMembers,
      }))
    }
  }, [formData.league_id, leagues])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCaptainCheckboxChange = (index) => {
    const updatedMembers = [...formData.members]
    updatedMembers.forEach((member, i) => {
      member.is_captain = i === index;
    })
    setFormData((prevState) => ({
      ...prevState,
      members: updatedMembers,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      formData.league_id === '' ||
      formData.team_name === '' ||
      formData.members.some((member) => member.name === '')
    ) {
      alert('Please fill in all required fields.')
      return
    }

    try {
      const response = await axios.post('http://localhost:3001/teams', formData)
      console.log('Team signed up successfully:', response.data)

      setFormData({
        league_id: '',
        team_name: '',
        members: [{ name: '', cell_number: '', email: '', is_captain: false }],
      })
    } catch (error) {
      console.error('Error signing up team:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className='signin-label'>Team Signup</h1>
      <form className='signin-form' onSubmit={handleSubmit}>
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
          <label>Team Members:</label>
          {formData.members.map((member, index) => (
            <div key={index}>
              <input
                type="text"
                value={member.name}
                onChange={(e) => {
                  const updatedMembers = [...formData.members];
                  updatedMembers[index].name = e.target.value;
                  setFormData((prevState) => ({
                    ...prevState,
                    members: updatedMembers,
                  }))
                }}
                name={`members[${index}].name`}
                placeholder={`Member ${index + 1} Name`}
              />
              <input
                type="text"
                value={member.cell_number}
                onChange={(e) => {
                  const updatedMembers = [...formData.members];
                  updatedMembers[index].cell_number = e.target.value;
                  setFormData((prevState) => ({
                    ...prevState,
                    members: updatedMembers,
                  }))
                }}
                name={`members[${index}].cell_number`}
                placeholder={`Member ${index + 1} Cell Number`}
              />
              <input
                type="email"
                value={member.email}
                onChange={(e) => {
                  const updatedMembers = [...formData.members];
                  updatedMembers[index].email = e.target.value;
                  setFormData((prevState) => ({
                    ...prevState,
                    members: updatedMembers,
                  }));
                }}
                name={`members[${index}].email`}
                placeholder={`Member ${index + 1} Email`}
              />
              <label>
                <input
                  type="checkbox"
                  checked={member.is_captain}
                  onChange={() => handleCaptainCheckboxChange(index)}
                />
                Captain
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}