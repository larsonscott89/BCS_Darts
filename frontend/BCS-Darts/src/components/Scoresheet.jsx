import React, { useState } from 'react';
import axios from 'axios';

export default function ScoresheetForm() {
  const [formData, setFormData] = useState({
    team1: {
      teamName: '',
      games: {
        '501': [],
        'cricket': [],
        'doublesCricket': [],
        'team701': []
      },
      totalWins: ''
    },
    team2: {
      teamName: '',
      games: {
        '501': [],
        'cricket': [],
        'doublesCricket': [],
        'team701': []
      },
      totalWins: ''
    },
    week: ''
  });

  const handleGameChange = (e, team, gameType, index, field) => {
    const { value } = e.target;
    const updatedGames = [...formData[team].games[gameType]];
    updatedGames[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        games: {
          ...prevState[team].games,
          [gameType]: updatedGames
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission here
    } catch (error) {
      console.error('Error submitting scoresheet:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Team 1 */}
      <div style={{ marginRight: '20px' }}>
        <h2>Team 1</h2>
        <div>
          <label>Team Name:</label>
          <input type="text" value={formData.team1.teamName} onChange={(e) => setFormData({ ...formData, team1: { ...formData.team1, teamName: e.target.value } })} />
        </div>
        {Object.keys(formData.team1.games).map(gameType => (
          <div key={gameType}>
            <h3>{gameType.toUpperCase()}</h3>
            {formData.team1.games[gameType].map((game, index) => (
              <div key={index}>
                <label>Total QPs:</label>
                <input type="text" value={game.quality_points} onChange={(e) => handleGameChange(e, 'team1', gameType, index, 'quality_points')} />
                <label>Player Name:</label>
                <input type="text" value={game.match_result} onChange={(e) => handleGameChange(e, 'team1', gameType, index, 'match_result')} />
                {/* Add other fields based on the game type */}
              </div>
            ))}
          </div>
        ))}
        <div>
          <label>Total Wins:</label>
          <input type="text" value={formData.team1.totalWins} onChange={(e) => setFormData({ ...formData, team1: { ...formData.team1, totalWins: e.target.value } })} />
        </div>
      </div>

      {/* Team 2 */}
      <div>
        <h2>Team 2</h2>
        <div>
          <label>Team Name:</label>
          <input type="text" value={formData.team2.teamName} onChange={(e) => setFormData({ ...formData, team2: { ...formData.team2, teamName: e.target.value } })} />
        </div>
        {Object.keys(formData.team2.games).map(gameType => (
          <div key={gameType}>
            <h3>{gameType.toUpperCase()}</h3>
            {formData.team2.games[gameType].map((game, index) => (
              <div key={index}>
                <label>Total QPs:</label>
                <input type="text" value={game.quality_points} onChange={(e) => handleGameChange(e, 'team2', gameType, index, 'quality_points')} />
                <label>Player Name:</label>
                <input type="text" value={game.match_result} onChange={(e) => handleGameChange(e, 'team2', gameType, index, 'match_result')} />
                {/* Add other fields based on the game type */}
              </div>
            ))}
          </div>
        ))}
        <div>
          <label>Total Wins:</label>
          <input type="text" value={formData.team2.totalWins} onChange={(e) => setFormData({ ...formData, team2: { ...formData.team2, totalWins: e.target.value } })} />
        </div>
      </div>

      {/* Week Selection */}
      <div>
        <label htmlFor="week">Week:</label>
        <select id="week" name="week" value={formData.week} onChange={(e) => setFormData({ ...formData, week: e.target.value })}>
          <option value="week1">Week 1</option>
          {/* Add more weeks as needed */}
        </select>
        {/* Submit Button */}
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}