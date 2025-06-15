import './darts-game.css'
import { Target } from "../../applications/darts/components/target/target";
import { useLocation, Navigate } from "react-router-dom";
import type { GameConfig, Player, ThrowData } from '../../applications/darts/types/types';
import { Counter } from '../../applications/darts/components/counter/counter';
import { useEffect, useState } from 'react';
import { getPlayersAfterThrow, getPlayersAfterWinRound, isGameOver, isNextPlayerThrow, playerIsOverdonePoints, playerWinRounds } from '../../applications/darts/utils/game-logic';
import { DartsModal } from '../../applications/darts/components/modal/modal';
import { MINIMAL_PLAYERS_COUNT } from '../../applications/darts/utils/game-const';
export const Darts = () => {
    const location = useLocation();
    const gameData = location.state as GameConfig | null;
    const [players, setPlayers] = useState<Player[]>([])
    const [rounds, setRounds] = useState(1);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentThrow, setCurrentThrow] = useState(0);
    const [waitingForThrow, setWaitingForThrow] = useState(false);
    const [startPoints, setStartPoints] = useState(0)
    const [showModal, setShowModal] = useState(true);
    useEffect(() => {
        if (gameData) {
            setPlayers(
                gameData.players.map((p) => ({
                    ...p,
                    points: gameData.startPoints || 501,
                    winRound: 0,
                }))
            );
            setRounds(gameData.rounds);
            setStartPoints(gameData.startPoints)
        }
    }, [gameData]);

    const handleStartThrow = () => {
        setShowModal(false)
    }
    const handleScore = async (throwData: ThrowData) => {
        if (!waitingForThrow) return
        setWaitingForThrow(false)
        setPlayers((prev) => {
            if (playerIsOverdonePoints(prev, currentPlayerIndex, throwData)) {
                const nextPlayer = (currentPlayerIndex + 1) % players.length;
                setCurrentPlayerIndex(nextPlayer);
                setCurrentThrow(0);
                setShowModal(true)
            }
            return getPlayersAfterThrow(throwData.points, prev, currentPlayerIndex)
        })
        const nextThrow = currentThrow + 1
        setCurrentThrow(nextThrow)
        const player = players[currentPlayerIndex]
        // Победа в раунде
        if (playerWinRounds(player, throwData.points, throwData.throwType)) {
            setPlayers((prev) => {
                return getPlayersAfterWinRound(prev, currentPlayerIndex, startPoints)
            });
        }
        if (isNextPlayerThrow(playerWinRounds(player, throwData.points, throwData.throwType), nextThrow)) {
            // следующий игрок
            const nextPlayer = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayer);
            setCurrentThrow(0);
            setShowModal(true)
        }
        // проверка конца игры

        if (!isGameOver(players, rounds)) {
            // Ждём следующего броска
            setTimeout(() => {
                setWaitingForThrow(true)
            }, 300);
        }
    }

    useEffect(() => {
        if (players.length >= MINIMAL_PLAYERS_COUNT) {
            setWaitingForThrow(true); // запускаем первый бросок
        }
    }, [players]);

    if (!gameData || gameData.players.length < MINIMAL_PLAYERS_COUNT) {
        return <Navigate to="/darts-setup" />;
    }

    return (
        <div className='darts-game'>
            {showModal && (
                <DartsModal player={players[currentPlayerIndex]} message={'сообщение'} onStart={handleStartThrow} />
            )}
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