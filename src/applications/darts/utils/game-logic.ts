import { ThrowTypes, type Player } from "../types/types";
import { MAXIMUM_THROW_COUNT } from "./game-const";
export const getPlayersAfterThrow = (points: number, prevPlayers: Player[], currentPlayerIndex: number): Player[] => {
    const newPlayers = [...prevPlayers]
    const currentPlayer = newPlayers[currentPlayerIndex]
    if (currentPlayer.points - points > 1 || currentPlayer.points - points === 0) {
        currentPlayer.points = currentPlayer.points - points
    }
    return newPlayers
}

export const getPlayersAfterWinRound = (prevPlayers: Player[], startPoins: number): Player[] => {
    const updated = [...prevPlayers];
    updated.forEach(player => {
        player.points = startPoins
    })
    return updated;
}

export const playerIsOverdonePoints = (player: Player, throwPoints: number): boolean => {
    return player.points - throwPoints < 2
}

export const isPlayerWinRounds = (player: Player, points: number, throwType: ThrowTypes): boolean => {
    return player.points - points === 0 && (throwType === ThrowTypes.DOUBLED || throwType === ThrowTypes.RED_BULL)
}

export const isPlayerDidAllThrows = (throwCount: number): boolean => {
    return throwCount === MAXIMUM_THROW_COUNT
}

export const isPlayerWinGame = (player: Player, roundsCount: number): boolean => {
    return player.winRounds === roundsCount
}

export const getWinGameMessage = (name: string): string => {
    return `Игрок ${name} одержал победу!`
}

export const getWinRoundMessage = (name: string): string => {
    return `Игрок ${name} выиграл лег!`
}

export const getOverloadPointsMessage = (name: string): string => {
    return `Игрок ${name} перебрал очков`
}

export const getDidAllThrowsMessage = (name: string): string => {
    return `Игрок ${name} сходил`
} 

export const getStartGameMessage = (name: string): string => {
    return `Начинает игрок ${name}`
}

