import React, { useState } from 'react';
import axios from 'axios';

export default function Scoresheet() {
  const [formData, setFormData] = useState({
    team1: {
      team_id: '',
      games: [
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', total_qps: '', white_hat: '' },
        // Add initial game objects for other game types if needed
      ],
    },
    team2: {
      team_id: '',
      games: [
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', total_qps: '', white_hat: '' },
        // Add initial game objects for other game types if needed
      ],
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

  return (
    <div style={{ display: 'flex' }}>
      {/* Team 1 */}
      <div style={{ marginRight: '20px' }}>
        <h2>Team 1</h2>
        {formData.team1.games.map((game, index) => (
          <div key={index}>
            <h3>{game.game_type.toUpperCase()}</h3>
            {game.game_type === '501' && (
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '20px' }}>
                  <label>Total QPs:</label>
                  <input
                    type="text"
                    value={game.total_qps}
                    onChange={(e) => handleGameChange('team1', game.game_type, index, 'total_qps', e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginRight: '20px' }}>
                  <label>Player Name:</label>
                  <input
                    type="text"
                    value={game.player_name}
                    onChange={(e) => handleGameChange('team1', game.game_type, index, 'player_name', e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginRight: '20px' }}>
                  <label>Number of Darts:</label>
                  <input
                    type="text"
                    value={game.number_of_darts}
                    onChange={(e) => handleGameChange('team1', game.game_type, index, 'number_of_darts', e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginRight: '20px' }}>
                  <label>Points Left:</label>
                  <input
                    type="text"
                    value={game.points_left}
                    onChange={(e) => handleGameChange('team1', game.game_type, index, 'points_left', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Result:</label>
                  <select
                    value={game.result}
                    onChange={(e) => handleGameChange('team1', game.game_type, index, 'result', e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="win">Win</option>
                    <option value="lose">Lose</option>
                  </select>
                </div>
              </div>
            )}
            {game.game_type === 'cricket' && (
              <>
                <div>
                  <label>White/Hat:</label>
                  <input
                    type="text"
                    value={game.white_hat}
                    onChange={(e) => handleGameChange('team1', game.game_type, index, 'white_hat', e.target.value)}
                    required
                  />
                </div>
                {/* Add other fields for cricket game */}
              </>
            )}
            {/* Add conditions for other game types */}
          </div>
        ))}
      </div>

      {/* Team 2 */}
      <div>
        <h2>Team 2</h2>
        {formData.team2.games.map((game, index) => (
          <div key={index}>
            <h3>{game.game_type.toUpperCase()}</h3>
            {game.game_type === '501' && (
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '20px' }}>
                  <label>Total QPs:</label>
                  <input
                    type="text"
                    value={game.total_qps}
                    onChange={(e) => handleGameChange('team2', game.game_type, index, 'total_qps', e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginRight: '20px' }}>
                  <label>Player Name:</label>
                  <input
                    type="text"
                    value={game.player_name}
                    onChange={(e) => handleGameChange('team2', game.game_type, index, 'player_name', e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginRight: '20px' }}>
                  <label>Number of Darts:</label>
                  <input
                    type="text"
                    value={game.number_of_darts}
                    onChange={(e) => handleGameChange('team2', game.game_type, index, 'number_of_darts', e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginRight: '20px' }}>
                  <label>Points Left:</label>
                  <input
                    type="text"
                    value={game.points_left}
                    onChange={(e) => handleGameChange('team2', game.game_type, index, 'points_left', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Result:</label>
                  <select
                    value={game.result}
                    onChange={(e) => handleGameChange('team2', game.game_type, index, 'result', e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="win">Win</option>
                    <option value="lose">Lose</option>
                  </select>
                </div>
              </div>
            )}
            {/* Add conditions for other game types */}
          </div>
        ))}
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