import React, { useState } from 'react';
import axios from 'axios';

export default function ScoresheetForm() {
  const [formData, setFormData] = useState({
    team1: {
      team_id: '',
      games: [],
    },
    team2: {
      team_id: '',
      games: [],
    },
    league_id: '',
    week: ''
  });

  const handleGameChange = (team, gameType, index, field, value) => {
    const updatedGames = [...formData[team].games];
    updatedGames[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        games: updatedGames,
      },
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

  const renderGameInputs = (team) => {
    return formData[team].games.map((game, index) => (
      <div key={index}>
        <h3>{game.game_type.toUpperCase()}</h3>
        <div>
          <label>Winner:</label>
          <input
            type="text"
            value={game.winner}
            onChange={(e) => handleGameChange(team, index, 'winner', e.target.value)}
          />
        </div>
        <div>
          <label>Loser:</label>
          <input
            type="text"
            value={game.loser}
            onChange={(e) => handleGameChange(team, index, 'loser', e.target.value)}
          />
        </div>
        <div>
          <label>Match Result:</label>
          <input
            type="text"
            value={game.match_result}
            onChange={(e) => handleGameChange(team, index, 'match_result', e.target.value)}
          />
        </div>
        {/* Add other fields based on the game type */}
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Team 1 */}
      <div style={{ marginRight: '20px' }}>
        <h2>Team 1</h2>
        {renderGameInputs('team1')}
      </div>

      {/* Team 2 */}
      <div>
        <h2>Team 2</h2>
        {renderGameInputs('team2')}
      </div>

      {/* League and Week Selection */}
      <div>
        <div>
          <label>League ID:</label>
          <input
            type="text"
            value={formData.league_id}
            onChange={(e) => setFormData({ ...formData, league_id: e.target.value })}
          />
        </div>
        <div>
          <label>Week:</label>
          <input
            type="text"
            value={formData.week}
            onChange={(e) => setFormData({ ...formData, week: e.target.value })}
          />
        </div>
        {/* Submit Button */}
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}