import React, { useState, useEffect } from 'react'
import axios from 'axios'


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
    week: '',
    total_wins: ''
  })

  const [teams, setTeams] = useState([]);
  const [selectedTeam1, setSelectedTeam1] = useState('');
  const [selectedTeam2, setSelectedTeam2] = useState('');
  const [playersTeam1, setPlayersTeam1] = useState([]);
  const [playersTeam2, setPlayersTeam2] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  const handleTeamChange = (event, teamNumber) => {
    const selectedTeamId = event.target.value;
    if (teamNumber === 1) {
      setSelectedTeam1(selectedTeamId);
      const team = teams.find(team => team._id === selectedTeamId);
      if (team) {
        setPlayersTeam1(team.members);
        setFormData(prevState => ({
          ...prevState,
          team1: {
            ...prevState.team1,
            team_id: selectedTeamId
          }
        }));
      }
    } else if (teamNumber === 2) {
      setSelectedTeam2(selectedTeamId);
      const team = teams.find(team => team._id === selectedTeamId);
      if (team) {
        setPlayersTeam2(team.members);
        setFormData(prevState => ({
          ...prevState,
          team2: {
            ...prevState.team2,
            team_id: selectedTeamId
          }
        }));
      }
    }
  };

  const handlePlayerChange = (event, teamNumber, index) => {
    const selectedPlayerId = event.target.value;
    if (teamNumber === 1) {
      setFormData(prevState => ({
        ...prevState,
        team1: {
          ...prevState.team1,
          games: prevState.team1.games.map((game, i) => i === index ? { ...game, player_name: selectedPlayerId } : game)
        }
      }));
    } else if (teamNumber === 2) {
      setFormData(prevState => ({
        ...prevState,
        team2: {
          ...prevState.team2,
          games: prevState.team2.games.map((game, i) => i === index ? { ...game, player_name: selectedPlayerId } : game)
        }
      }));
    }
  }

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
    <div className='page-container'>
      <div className='scoresheet-container'>
        {/* Team 1 */}
        <div className='team1-container'>
          <div>
            <label className='week-label'>Week:</label>
            <input className='week-input'
                    type="text"
                    value={formData.week}
                    onChange={(e) => setFormData({ ...formData, week: e.target.value })}/>
          </div>

          <h2 className='team-label'>Team 1</h2>
          <select className='team-select' value={selectedTeam1} onChange={(e) => handleTeamChange(e, 1)}>
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team._id} value={team._id}>{team.team_name}</option>
            ))}
          </select>

          {formData.team1.games.map((game, index) => (
            <div key={index} className='game-container'>
              {/* Display game title only if it's the first game of its type */}
              {index === 0 || game.game_type !== formData.team1.games[index - 1].game_type ? (
                <h3 className='game-title'>{game.game_type.toUpperCase()}</h3>
              ) : null}

              {/* Inputs for 501 game */}
              {game.game_type === '501' && (
                <div className='five-container'>
                  <div>
                    <label className='qp-label'>Total QPs:</label>
                    <input className='qp-input'
                            type="text"
                            value={game.total_qps}
                            onChange={(e) => handleGameChange('team1', index, 'total_qps', e.target.value)}
                            required
                    />
                  </div>
                  <select className='player-select'
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                    <option value="">Select Player</option>
                    {playersTeam1.map(player => (
                      <option key={player._id} value={player._id}>{player.name}</option>
                    ))}
                  </select>
                  <div>
                    <label className='number-darts-label'>Number of Darts:</label>
                    <input className='number-darts-input'
                            type="text"
                            value={game.number_of_darts}
                            onChange={(e) => handleGameChange('team1', index, 'number_of_darts', e.target.value)}
                            required
                    />
                  </div>
                  <div>
                    <label className='highpoint-label'>High Point Out:</label>
                    <input className='highpoint-input'
                            type="text"
                            value={game.points_left}
                            onChange={(e) => handleGameChange('team1', index, 'points_left', e.target.value)}
                            required/>
                  </div>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result} 
                            onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}

    {/* Inputs for cricket game */}
              {game.game_type === 'cricket' && (
                <div className='cricket-container'>
                  <div>
                    <label className='whitehorse-label'>White Horse:</label>
                    <input className='whitehorse-input'
                            type="text"
                            value={game.white_hat}
                            onChange={(e) => handleGameChange('team1', index, 'white_hat', e.target.value)}
                            required/>
                  </div>
                  <select className='player-select'
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                    <option value="">Select Player</option>
                    {playersTeam1.map(player => (
                      <option key={player._id} value={player._id}>{player.name}</option>
                    ))}
                  </select>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result} 
                            onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}

    {/* Inputs for doubles cricket game */}
              {game.game_type === 'doubles cricket1' && (
                <div className='cricket-container'>
                  <div>
                    <label className='whitehorse-label'>White Horse:</label>
                      <input className='whitehorse-input'
                              type="text"
                              value={game.white_hat}
                              onChange={(e) => handleGameChange('team1', index, 'white_hat', e.target.value)}
                              required/>
                  </div>
                  <select className='player-select' 
                    value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                  <option value="">Select Player</option>
                  {playersTeam1.map(player => (
                    <option key={player._id} value={player._id}>{player.name}</option>
                  ))}
                </select>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result}
                            onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}
    {/* Inputs for doubles cricket game */}
              {game.game_type === 'doubles cricket2' && (
                <div className='cricket-container'>
                  <div>
                    <label className='whitehorse-label'>White Horse:</label>
                    <input className='whitehorse-input'
                            type="text"
                            value={game.white_hat}
                            onChange={(e) => handleGameChange('team1', index, 'white_hat', e.target.value)}
                            required/>
                  </div>
                  <select className='player-select' 
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                  <option value="">Select Player</option>
                  {playersTeam1.map(player => (
                    <option key={player._id} value={player._id}>{player.name}</option>
                  ))}
                </select>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result}
                            onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}

    {/* Inputs for team 701 game */}
              {game.game_type === 'team 701' && (
                <div className='seven-container'>
                  <div>
                    <label className='qp-label'>Total QPs:</label>
                    <input className='qp-input'
                            type="text"
                            value={game.total_qps}
                            onChange={(e) => handleGameChange('team1', index, 'total_qps', e.target.value)}
                            required/>
                  </div>
                  <select className='player-select' 
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                  <option value="">Select Player</option>
                  {playersTeam1.map(player => (
                    <option key={player._id} value={player._id}>{player.name}</option>
                  ))}
                </select>
                  <div>
                    <label className='number-darts-label'>Number of Darts:</label>
                    <input className='number-darts-input'
                            type="text"
                            value={game.number_of_darts}
                            onChange={(e) => handleGameChange('team1', index, 'number_of_darts', e.target.value)}
                            required/>
                  </div>
                  <div>
                    <label className='highpoint-label'>High Point Out:</label>
                    <input className='highpoint-input'
                            type="text"
                            value={game.points_left}
                            onChange={(e) => handleGameChange('team1', index, 'points_left', e.target.value)}
                            required/>
                  </div>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result}
                            onChange={(e) => handleGameChange('team1', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
    {/* Inputs for total wins */}
          <div className='total-wins-container'>
          <label className='total-wins-label'>Total Wins:</label>
            <input className='total-wins-input'
                    type="text"
                    value={formData.total_wins}
                    onChange={(e) => setFormData({ ...formData, league_id: e.target.value })}/>
          </div>
        </div>
        

    {/* Team 2 */}
        <div className='team2-container'>
          <div>
              <label className='week-label'>League ID:</label>
              <input className='week-input'
                      type="text"
                      value={formData.league_id}
                    onChange={(e) => setFormData({ ...formData, league_id: e.target.value })}/>
            </div>
            <h2 className='team-label'>Team 2</h2>
          <select className='team-select' value={selectedTeam2} onChange={(e) => handleTeamChange(e, 1)}>
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team._id} value={team._id}>{team.team_name}</option>
            ))}
          </select>

          {formData.team2.games.map((game, index) => (
            <div key={index} className='game-container'>
              {/* Display game title only if it's the first game of its type */}
              {index === 0 || game.game_type !== formData.team2.games[index - 1].game_type ? (
                <h3 className='game-title'>{game.game_type.toUpperCase()}</h3>
              ) : null}

              {/* Inputs for 501 game */}
              {game.game_type === '501' && (
                <div className='five-container'>
                  <div>
                    <label className='qp-label'>Total QPs:</label>
                    <input className='qp-input'
                            type="text"
                            value={game.total_qps}
                            onChange={(e) => handleGameChange('team2', index, 'total_qps', e.target.value)}
                            required
                    />
                  </div>
                  <select className='player-select'
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                    <option value="">Select Player</option>
                    {playersTeam2.map(player => (
                      <option key={player._id} value={player._id}>{player.name}</option>
                    ))}
                  </select>
                  <div>
                    <label className='number-darts-label'>Number of Darts:</label>
                    <input className='number-darts-input'
                            type="text"
                            value={game.number_of_darts}
                            onChange={(e) => handleGameChange('team2', index, 'number_of_darts', e.target.value)}
                            required
                    />
                  </div>
                  <div>
                    <label className='highpoint-label'>High Point Out:</label>
                    <input className='highpoint-input'
                            type="text"
                            value={game.points_left}
                            onChange={(e) => handleGameChange('team2', index, 'points_left', e.target.value)}
                            required/>
                  </div>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result} 
                            onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}

    {/* Inputs for cricket game */}
              {game.game_type === 'cricket' && (
                <div className='cricket-container'>
                  <div>
                    <label className='whitehorse-label'>White Horse:</label>
                    <input className='whitehorse-input'
                            type="text"
                            value={game.white_hat}
                            onChange={(e) => handleGameChange('team2', index, 'white_hat', e.target.value)}
                            required/>
                  </div>
                  <select className='player-select'
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                    <option value="">Select Player</option>
                    {playersTeam2.map(player => (
                      <option key={player._id} value={player._id}>{player.name}</option>
                    ))}
                  </select>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result} 
                            onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}

    {/* Inputs for doubles cricket game */}
              {game.game_type === 'doubles cricket1' && (
                <div className='cricket-container'>
                  <div>
                    <label className='whitehorse-label'>White Horse:</label>
                      <input className='whitehorse-input'
                              type="text"
                              value={game.white_hat}
                              onChange={(e) => handleGameChange('team2', index, 'white_hat', e.target.value)}
                              required/>
                  </div>
                  <select className='player-select' 
                    value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                  <option value="">Select Player</option>
                  {playersTeam2.map(player => (
                    <option key={player._id} value={player._id}>{player.name}</option>
                  ))}
                </select>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result}
                            onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}
    {/* Inputs for doubles cricket game */}
              {game.game_type === 'doubles cricket2' && (
                <div className='cricket-container'>
                  <div>
                    <label className='whitehorse-label'>White Horse:</label>
                    <input className='whitehorse-input'
                            type="text"
                            value={game.white_hat}
                            onChange={(e) => handleGameChange('team2', index, 'white_hat', e.target.value)}
                            required/>
                  </div>
                  <select className='player-select' 
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                  <option value="">Select Player</option>
                  {playersTeam2.map(player => (
                    <option key={player._id} value={player._id}>{player.name}</option>
                  ))}
                </select>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result}
                            onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}

    {/* Inputs for team 701 game */}
              {game.game_type === 'team 701' && (
                <div className='seven-container'>
                  <div>
                    <label className='qp-label'>Total QPs:</label>
                    <input className='qp-input'
                            type="text"
                            value={game.total_qps}
                            onChange={(e) => handleGameChange('team2', index, 'total_qps', e.target.value)}
                            required/>
                  </div>
                  <select className='player-select' 
                      value={game.player_name} onChange={(e) => handlePlayerChange(e, 1, index)}>
                  <option value="">Select Player</option>
                  {playersTeam2.map(player => (
                    <option key={player._id} value={player._id}>{player.name}</option>
                  ))}
                </select>
                  <div>
                    <label className='number-darts-label'>Number of Darts:</label>
                    <input className='number-darts-input'
                            type="text"
                            value={game.number_of_darts}
                            onChange={(e) => handleGameChange('team2', index, 'number_of_darts', e.target.value)}
                            required/>
                  </div>
                  <div>
                    <label className='highpoint-label'>High Point Out:</label>
                    <input className='highpoint-input'
                            type="text"
                            value={game.points_left}
                            onChange={(e) => handleGameChange('team2', index, 'points_left', e.target.value)}
                            required/>
                  </div>
                  <div>
                    <label className='results-label'>Result:</label>
                    <select className='results-input'
                            value={game.result}
                            onChange={(e) => handleGameChange('team2', index, 'result', e.target.value)}
                            required>
                      <option value="">Select</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
    {/* Inputs for total wins */}
          <div className='total-wins-container'>
          <label className='total-wins-label'>Total Wins:</label>
            <input className='total-wins-input'
                    type="text"
                    value={formData.total_wins}
                    onChange={(e) => setFormData({ ...formData, league_id: e.target.value })}/>
          </div>
        </div>
        </div>
            <button className='score-submit-button'
                    type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    
  )
}