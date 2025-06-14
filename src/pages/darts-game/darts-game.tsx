import './darts-game.css'
import { Target } from "../../applicatoins/darts/components/target/target";
import { useLocation, Navigate } from "react-router-dom";
import type { GameConfig, Player } from '../../applicatoins/darts/types/types';
import { Counter } from '../../applicatoins/darts/components/counter/counter';
import { useEffect, useState } from 'react';

export const Darts = () => {
    const location = useLocation();
    const gameData = location.state as GameConfig | null;
    const [players, setPlayers] = useState<Player[]>([])
    const [rounds, setRounds] = useState(1);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentThrow, setCurrentThrow] = useState(0);
    const [waitingForThrow, setWaitingForThrow] = useState(false);
    useEffect(() => {
        if (gameData) {
            setPlayers(
                gameData.players.map((p) => ({
                    ...p,
                    points: gameData.players[0].points || 501,
                    winRound: 0,
                }))
            );
            setRounds(gameData.rounds);
        }
    }, [gameData]);

    const handleScore = async (points: number) => {
        if (!waitingForThrow) return
        setWaitingForThrow(false)
        setPlayers((prev) => {
            const newPlayers = [...prev]
            const currentPlayer = newPlayers[currentPlayerIndex]
            currentPlayer.points = currentPlayer.points - points
            return newPlayers
        })
        const nextThrow = currentThrow + 1
        setCurrentThrow(nextThrow)
        const player = players[currentPlayerIndex]
        // Победа в раунде
        if (player.points - points === 0) {
            setPlayers((prev) => {
                const updated = [...prev];
                updated[currentPlayerIndex].winRounds += 1;
                updated[currentPlayerIndex].points = gameData?.players[0].points || 501;
                return updated;
            });
        }
        if (player.points - points === 0 || nextThrow === 3) {
            // следующий игрок
            const nextPlayer = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayer);
            setCurrentThrow(0);
        }
        // проверка конца игры
        const gameEnded = players.some(
            (p) => p.winRounds >= rounds
        );
        if (!gameEnded) {
            // Ждём следующего броска
            setTimeout(() => setWaitingForThrow(true), 300);
        }
    }

    useEffect(() => {
        if (players.length >= 2) {
            setWaitingForThrow(true); // запускаем первый бросок
        }
    }, [players]);


    if (!gameData || gameData.players.length < 2) {
        return <Navigate to="/darts-setup" />;
    }

    return (
        <div className='darts-game'>
            <h1>Дартс</h1>
            <h2>Ходит {players[currentPlayerIndex]?.name}</h2>
            <div className="target-wrapper">
                <Target onHit={handleScore} />
            </div>
            <div className="counters-container">
                {players.map((player, i) => {
                    return (
                        <Counter key={i} player={player} />
                    )
                })}
            </div>
        </div>
    );
}