import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Player, GameConfig } from "../../applicatoins/darts/types/types";
// import { Link } from "react-router-dom";
export default function SetupPage() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState(1);
  const [points, setPoints] = useState(501);

  const navigate = useNavigate();

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;
    setPlayers([...players, { name: playerName, points, winRounds: 0 }]);
    setPlayerName("");
  };

  const handleStartGame = () => {
    if (players.length < 2) return;

    const gameData: GameConfig = {
      players: players.map(p => ({
        ...p,
        points, // обнулим очки для начала
        winRound: 0,
      })),
      rounds
    };

    navigate("/darts", { state: gameData });
  };

  return (
    <div className="setup-container">
      <h1>Настройка игры</h1>

      <input
        type="text"
        placeholder="Имя игрока"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
      />
      <button onClick={handleAddPlayer} disabled={!playerName.trim()}>
        Добавить игрока
      </button>

      <ul>
        {players.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>

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

      <button onClick={handleStartGame} disabled={players.length < 2}>
        Начать игру
      </button>
    </div>
  );
}
