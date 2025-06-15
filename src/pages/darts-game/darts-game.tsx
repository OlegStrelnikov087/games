import './darts-game.css'
import { Target } from "../../applications/darts/components/target/target";
import { useLocation, Navigate } from "react-router-dom";
import type { GameConfig, Player, ThrowData } from '../../applications/darts/types/types';
import { Counter } from '../../applications/darts/components/counter/counter';
import { useEffect, useState } from 'react';
import { getPlayersAfterThrow, getPlayersAfterWinRound, isGameOver, playerIsOverdonePoints, isPlayerWinRounds, isPlayerDidAllThrows } from '../../applications/darts/utils/game-logic';
import { DartsModal } from '../../applications/darts/components/modal/modal';
import { MINIMAL_PLAYERS_COUNT } from '../../applications/darts/utils/game-const';
export const Darts = () => {
    const location = useLocation();
    const gameData = location.state as GameConfig | null;
    const [players, setPlayers] = useState<Player[]>([])
    const [rounds, setRounds] = useState(1);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentThrow, setCurrentThrow] = useState(1);
    const [waitingForThrow, setWaitingForThrow] = useState(false);
    const [startPoints, setStartPoints] = useState(0);
    const [showModal, setShowModal] = useState(true);
    const [modalMessage, setModalMessage] = useState<string>('Начинаем!')
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
            if (playerIsOverdonePoints(prev[currentPlayerIndex], throwData.points)) {
                return [...prev]
            } else return getPlayersAfterThrow(throwData.points, prev, currentPlayerIndex)
        })

        const player = players[currentPlayerIndex]

        if (isPlayerWinRounds(player, throwData.points, throwData.throwType)) {
            console.log('WIN ROUND!');
            setCurrentThrow(1)
            setModalMessage(`${player.name} выйграл лег!`)
            setPlayers((prev) => {
                return getPlayersAfterWinRound(prev, currentPlayerIndex, startPoints)
            });
            setShowModal(true)
        }
        else if (playerIsOverdonePoints(player, throwData.points)) {
            setModalMessage(`${player.name} перебрал очков`)
            const nextPlayer = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayer);
            setCurrentThrow(1);
            setShowModal(true)
        } else {
            setCurrentThrow(prev => prev + 1)
        }

        if (isPlayerDidAllThrows(currentThrow)) {
            setModalMessage(`${player.name} сходил 3 раза`)
            const nextPlayer = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayer);
            setCurrentThrow(1);
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
                <DartsModal player={players[currentPlayerIndex]} message={modalMessage} onStart={handleStartThrow} />
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