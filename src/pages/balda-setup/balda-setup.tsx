import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './balda-setup.css'
import { BALDA_GAME_TYPE, BaldaGameConfig, BaldaNotTimeLimitForThrow } from "../../applications/balda/types/types";
import { MAXIMUM_TIME_LIMIT_FOR_THROW, MINIMAL_TIME_LIMIT_FOR_THROW, NOT_TIME_LIMIT_FOR_THROW, STANDART_TIME_LIMIT_FOR_THROW } from "../../applications/balda/utils/balda-const";
export const BaldaSetup = () => {
    const gameType = BALDA_GAME_TYPE.USER_AND_USER
    const [player1Name, setPlayer1Name] = useState<string>("");
    const [player2Name, setPlayer2Name] = useState<string>("");
    const [boardSize, setBoardSize] = useState<3 | 4 | 5 | 6>(5);
    const [timeLimitEnabled, setTimeLimitEnabled] = useState<boolean>(false);
    const [timeLimit, setTimeLimit] = useState<number | BaldaNotTimeLimitForThrow>(STANDART_TIME_LIMIT_FOR_THROW);
    const navigate = useNavigate();
   
    const handleStartGame = () => {
        const gameConfig: BaldaGameConfig = {
            player1: {name: player1Name, score: 0}, 
            player2: {name: player2Name, score: 0},
            gameType: gameType,
            boardSize: boardSize,
            timeLimit: (timeLimitEnabled && timeLimit!==NOT_TIME_LIMIT_FOR_THROW && timeLimit >= MINIMAL_TIME_LIMIT_FOR_THROW && timeLimit <= MAXIMUM_TIME_LIMIT_FOR_THROW) ? timeLimit : NOT_TIME_LIMIT_FOR_THROW
        };
        navigate('/balda-game', {state: gameConfig})
    }
    
    return (<div className="balda-users-setup">
        <h1>Настройка игры в Балду</h1>
        {gameType === BALDA_GAME_TYPE.USER_AND_USER && (
            <>
                <div className="setup-section">
                    <label>Игрок 1:</label>
                    <input
                        type="text"
                        placeholder="Введите имя"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)} />
                </div>
                <div className="setup-section">
                    <label>Игрок 2:</label>
                    <input
                        type="text"
                        placeholder="Введите имя"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)} />
                </div>
            </>
        )}
        {/* {gameType === BALDA_GAME_TYPE.BOT_AND_USER && (
             <div className="setup-section">
             <label>Игрок:</label>
             <input
                 type="text"
                 placeholder="Введите имя"
                 value={player1Name}
                 onChange={(e) => setPlayer1Name(e.target.value)} />
         </div>
        )} */}

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

            {timeLimitEnabled && timeLimit!==NOT_TIME_LIMIT_FOR_THROW && (
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
            disabled={!player1Name.trim() || (gameType === BALDA_GAME_TYPE.USER_AND_USER && !player2Name.trim())}
        >
            Начать игру
        </button>
    </div>
    )

}