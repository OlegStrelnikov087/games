import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Player, GameConfig } from "../../applications/darts/types/types";
import { MINIMAL_PLAYERS_COUNT } from "../../applications/darts/utils/game-const";
import './setup.css'
export default function SetupPage() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState(1);
  const [points, setPoints] = useState(501);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");


  const navigate = useNavigate();

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;
    setPlayers([...players, { name: playerName, points, winRounds: 0 }]);
    setPlayerName("");
  };

  const handleDeletePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const startEditPlayer = (index: number) => {
    setEditingIndex(index);
    setEditName(players[index].name);
  };

  const saveEditPlayer = () => {
    if (editingIndex === null || !editName.trim()) return;

    setPlayers(players.map((player, index) =>
      index === editingIndex ? { ...player, name: editName } : player
    ));

    setEditingIndex(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
  };

  const handleStartGame = () => {
    if (players.length < MINIMAL_PLAYERS_COUNT) return;

    const gameData: GameConfig = {
      players: players.map(p => ({
        ...p,
        points, // обнулим очки для начала
        winRound: 0,
      })),
      rounds,
      startPoints: points
    };

    navigate("/darts", { state: gameData });
  };

  return (
    <div className="setup-container">
      <h1>Настройка игры</h1>

      <div className="add-player-section">
        <input
          type="text"
          placeholder="Имя игрока"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />
        <button onClick={handleAddPlayer} disabled={!playerName.trim()}>
          Добавить игрока
        </button>
      </div>

      <div className="players-list">
        {players.map((p, i) => (
          <div className='player-card' key={i}>
            {editingIndex === i ? (
              <div className="edit-player-block">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
                <div className="edit-player-antions">
                  <button onClick={saveEditPlayer}>Сохранить</button>
                  <button onClick={cancelEdit}>Отмена</button>
                </div>
              </div>
            ) : (
              <div className="player-item">
                <span>{p.name}</span>
                <div className="player-item-actions">
                  <button onClick={() => startEditPlayer(i)}>Изменить</button>
                  <button onClick={() => handleDeletePlayer(i)}>Удалить</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="game-settings">
        <label>Раунды:</label>
        <input
          type="number"
          min={1}
          value={rounds}
          onChange={e => setRounds(Number(e.target.value))}
        />

        <label>Очки:</label>
        <select value={points} onChange={e => setPoints(Number(e.target.value))}>
          <option value={501}>501</option>
          <option value={301}>301</option>
          <option value={101}>101</option>
        </select>
      </div>

      <button
        onClick={handleStartGame}
        disabled={players.length < MINIMAL_PLAYERS_COUNT}
        className="start-game-button"
      >
        Начать игру
      </button>
    </div>
  );
}
