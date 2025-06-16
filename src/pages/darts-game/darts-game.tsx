import './darts-game.css'
import { Target } from "../../applications/darts/components/target/target";
import { useLocation, Navigate } from "react-router-dom";
import type { GameConfig, Player, ThrowData } from '../../applications/darts/types/types';
import { Counter } from '../../applications/darts/components/counter/counter';
import { useEffect, useState } from 'react';
import { getPlayersAfterThrow, getPlayersAfterWinRound, isPlayerWinGame, playerIsOverdonePoints, isPlayerWinRounds, isPlayerDidAllThrows, getStartGameMessage, getWinGameMessage, getWinRoundMessage, getOverloadPointsMessage, getDidAllThrowsMessage } from '../../applications/darts/utils/game-logic';
import { DartsModal } from '../../applications/darts/components/throw-modal/modal';
import { MINIMAL_PLAYERS_COUNT } from '../../applications/darts/utils/game-const';
import { GameOverModal } from '../../applications/darts/components/game-over-modal/modal';
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
    const [modalMessage, setModalMessage] = useState<string>(getStartGameMessage(gameData?.players[0]?.name ?? ''))
    const [gameIsContinue, setGameIsContinue] = useState<boolean>(true)
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

    const handleRestartGame = () => {
        if (!gameData) return
        setPlayers(
            gameData.players.map((p) => ({
                ...p,
                points: gameData.startPoints || 501,
                winRound: 0,
            }))
        );
        setRounds(gameData.rounds);
        setStartPoints(gameData.startPoints)
        setCurrentPlayerIndex(0)
        setCurrentThrow(1)
        setWaitingForThrow(false)
        setModalMessage(getStartGameMessage(players[currentPlayerIndex].name))
        setShowModal(true)
        setGameIsContinue(true)
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

            setPlayers((prev) => {
                return getPlayersAfterWinRound(prev, startPoints)
            });

            player.winRounds++

            if (isPlayerWinGame(player, rounds)) {
                setModalMessage(getWinGameMessage(player.name))
                setGameIsContinue(false)
            } else {
                setCurrentThrow(1)
                setModalMessage(getWinRoundMessage(player.name))
                setShowModal(true)
            }
        }

        else if (playerIsOverdonePoints(player, throwData.points)) {
            setModalMessage(getOverloadPointsMessage(player.name))
            const nextPlayer = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayer);
            setCurrentThrow(1);
            setShowModal(true)
        }

        else if (isPlayerDidAllThrows(currentThrow)) {
            setModalMessage(getDidAllThrowsMessage(player.name))
            const nextPlayer = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayer);
            setCurrentThrow(1);
            setShowModal(true)
        } else {
            setCurrentThrow(prev => prev + 1)
        }
        // проверка конца игры. Позже добавить выход с помощью кнопки 'завершить игру', пока только проверка на победу
        if (!(players.some(player => player.winRounds === rounds))) {
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
            {!gameIsContinue && (
                <GameOverModal handleRestartGame={handleRestartGame} />
            )}
            {showModal && gameIsContinue && (
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