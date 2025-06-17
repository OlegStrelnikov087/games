import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BaldaUsersSetup = () => {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [boardSize, setBoardSize] = useState<3 | 4 | 5 | 6>(5);
    const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);
    const [timeLimit, setTimeLimit] = useState(30);
    const navigate = useNavigate();
    const handleStartGame = () => {
        const gameConfig = {
            player1,
            player2,
            boardSize,
            timeLimit: (timeLimitEnabled && timeLimit>=10 && timeLimit<=120) ? timeLimit : null
          };
          console.log("Начинаем игру с настройками:", gameConfig);
          
    }
    return (<div className="balda-users-setup">
        <h1>Настройка игры в Балду</h1>

        <div className="setup-section">
            <label>Игрок 1:</label>
            <input
                type="text"
                placeholder="Введите имя"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
            />
        </div>

        <div className="setup-section">
            <label>Игрок 2:</label>
            <input
                type="text"
                placeholder="Введите имя"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
            />
        </div>

        <div className="setup-section">
            <label>Размер поля:</label>
            <select
                value={boardSize}
                onChange={(e) => setBoardSize(Number(e.target.value) as 3 | 4 | 5 | 6)}
            >
                <option value={3}>3 × 3</option>
                <option value={4}>4 × 4</option>
                <option value={5}>5 × 5</option>
                <option value={6}>6 × 6</option>
            </select>
        </div>

        <div className="setup-section">
            <label>
                <input
                    type="checkbox"
                    checked={timeLimitEnabled}
                    onChange={(e) => setTimeLimitEnabled(e.target.checked)}
                />
                Ограничение времени на ход
            </label>

            {timeLimitEnabled && (
                <div className="time-limit-options">
                    <input
                        type="number"
                        min="10"
                        max="120"
                        step="5"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Number(e.target.value))}
                    />
                    <span>секунд</span>
                </div>
            )}
        </div>

        <button
            className="start-game-button"
            onClick={handleStartGame}
            disabled={!player1.trim() || !player2.trim()}
        >
            Начать игру
        </button>
    </div>
    )
}