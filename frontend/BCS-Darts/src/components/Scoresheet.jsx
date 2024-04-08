import React, { useState } from 'react'

export default function Scoresheet() {
  const [formData, setFormData] = useState({
    team1: {
      team_id: '',
      games: [
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket1', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket1', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket2', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket2', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''}
      ],
    },
    team2: {
      team_id: '',
      games: [
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: '501', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'cricket', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket1', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket1', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket2', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'doubles cricket2', winner: '', loser: '', match_result: '', white_hat: '' },
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''},
        { game_type: 'team 701', winner: '', loser: '', match_result: '', total_qps: '', number_of_darts: '', point_left: ''}
      ],
    },
    league_id: '',
    week: ''
  })

  const handleGameChange = (team, index, field, value) => {
    const updatedGames = [...formData[team].games]
    updatedGames[index][field] = value
    setFormData(prevState => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        games: updatedGames,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const playerStats = [];
    for (const teamKey in formData) {
      const team = formData[teamKey]
      const teamId = team.team_id
      team.games.forEach((game, index) => {
        const playerId = `${teamId}-${index + 1}`
        playerStats.push({
          playerId: playerId,
          teamId: teamId,
          gameType: game.game_type,
          totalQps: game.total_qps,
          playerName: game.player_name,
          numberOfDarts: game.number_of_darts,
          pointsLeft: game.points_left,
          result: game.result,
          whiteHat: game.white_hat,
        })
      })
    }

    console.log('Player stats:', playerStats);

    setFormData({
      team1: {
        team_id: '',
        games: formData.team1.games.map(game => ({ ...game, total_qps: '', number_of_darts: '', points_left: '', result: '', white_hat: '' })),
      },
      team2: {
        team_id: '',
        games: formData.team2.games.map(game => ({ ...game, total_qps: '', number_of_darts: '', points_left: '', result: '', white_hat: '' })),
      },
      league_id: '',
      week: '',
    });
  } catch (error) {
    console.error('Error submitting scoresheet:', error);
  }
}

return (
  <div style={{ display: 'flex' }}>
    {/* Team 1 */}
    <div style={{ marginRight: '20px' }}>
      <h2>Team 1</h2>
      {formData.team1.games.map((game, index) => (
        <div key={index}>
          {index === 0 || game.game_type !== formData.team1.games[index - 1].game_type ? (
            <h3>{game.game_type.toUpperCase()}</h3>
          ) : null}
          {game.game_type === '501' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Total QPs:</label>
                <input
                  type="text"
                  value={game.total_qps}
                  onChange={(e) => handleGameChange('team1', index, 'total_qps', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team1', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Number of Darts:</label>
                <input
                  type="text"
                  value={game.number_of_darts}
                  onChange={(e) => handleGameChange('team1', index, 'number_of_darts', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Points Left:</label>
                <input
                  type="text"
                  value={game.points_left}
                  onChange={(e) => handleGameChange('team1', index, 'points_left', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
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
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Hat Trick or White Horse:</label>
                <input
                  type="text"
                  value={game.white_hat}
                  onChange={(e) => handleGameChange('team1', index, 'white_hat', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team1', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
          {game.game_type === 'doubles cricket1' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Hat Trick or White Horse:</label>
                <input
                  type="text"
                  value={game.white_hat}
                  onChange={(e) => handleGameChange('team1', index, 'white_hat', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team1', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
          {game.game_type === 'doubles cricket2' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Hat Trick or White Horse:</label>
                <input
                  type="text"
                  value={game.white_hat}
                  onChange={(e) => handleGameChange('team1', index, 'white_hat', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team1', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
          {game.game_type === 'team 701' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Total QPs:</label>
                <input
                  type="text"
                  value={game.total_qps}
                  onChange={(e) => handleGameChange('team1', index, 'total_qps', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team1', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Number of Darts:</label>
                <input
                  type="text"
                  value={game.number_of_darts}
                  onChange={(e) => handleGameChange('team1', index, 'number_of_darts', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Points Left:</label>
                <input
                  type="text"
                  value={game.points_left}
                  onChange={(e) => handleGameChange('team1', index, 'points_left', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Team 2 */}
    <div>
    <h2>Team 2</h2>
      {formData.team2.games.map((game, index) => (
        <div key={index}>
          {index === 0 || game.game_type !== formData.team2.games[index - 1].game_type ? (
            <h3>{game.game_type.toUpperCase()}</h3>
          ) : null}
          {game.game_type === '501' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Total QPs:</label>
                <input
                  type="text"
                  value={game.total_qps}
                  onChange={(e) => handleGameChange('team2', index, 'total_qps', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team2', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Number of Darts:</label>
                <input
                  type="text"
                  value={game.number_of_darts}
                  onChange={(e) => handleGameChange('team2', index, 'number_of_darts', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Points Left:</label>
                <input
                  type="text"
                  value={game.points_left}
                  onChange={(e) => handleGameChange('team2', index, 'points_left', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
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
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Hat Trick or White Horse:</label>
                <input
                  type="text"
                  value={game.white_hat}
                  onChange={(e) => handleGameChange('team2', index, 'white_hat', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team2', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
          {game.game_type === 'doubles cricket1' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Hat Trick or White Horse:</label>
                <input
                  type="text"
                  value={game.white_hat}
                  onChange={(e) => handleGameChange('team2', index, 'white_hat', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team2', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
          {game.game_type === 'doubles cricket2' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Hat Trick or White Horse:</label>
                <input
                  type="text"
                  value={game.white_hat}
                  onChange={(e) => handleGameChange('team2', index, 'white_hat', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team2', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
          {game.game_type === 'team 701' && (
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px' }}>
                <label>Total QPs:</label>
                <input
                  type="text"
                  value={game.total_qps}
                  onChange={(e) => handleGameChange('team2', index, 'total_qps', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Player Name:</label>
                <input
                  type="text"
                  value={game.player_name}
                  onChange={(e) => handleGameChange('team2', index, 'player_name', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Number of Darts:</label>
                <input
                  type="text"
                  value={game.number_of_darts}
                  onChange={(e) => handleGameChange('team2', index, 'number_of_darts', e.target.value)}
                  required
                />
              </div>
              <div style={{ marginRight: '20px' }}>
                <label>Points Left:</label>
                <input
                  type="text"
                  value={game.points_left}
                  onChange={(e) => handleGameChange('team2', index, 'points_left', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Result:</label>
                <select
                  value={game.result}
                  onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="win">Win</option>
                  <option value="lose">Lose</option>
                </select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

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
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  </div>
);
}