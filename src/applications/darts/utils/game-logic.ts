import { ThrowTypes, type Player, type ThrowData } from "../types/types";
import { MAXIMUM_THROW_COUNT } from "./game-const";
export const getPlayersAfterThrow = (points: number, prevPlayers: Player[], currentPlayerIndex: number): Player[] => {
    const newPlayers = [...prevPlayers]
    const currentPlayer = newPlayers[currentPlayerIndex]
    if (currentPlayer.points - points > 1 || currentPlayer.points - points === 0) {
        currentPlayer.points = currentPlayer.points - points
    }
    return newPlayers
}

export const getPlayersAfterWinRound = (prevPlayers: Player[], currentPlayerIndex: number, startPoins: number): Player[] => {
    const updated = [...prevPlayers];
    updated[currentPlayerIndex].winRounds += 1;
    updated.forEach(player => {
        player.points = startPoins
    })
    return updated;
}

export const playerIsOverdonePoints = (prevPlayers: Player[], currentPlayerIndex: number, throwData: ThrowData): boolean => {
    return prevPlayers[currentPlayerIndex].points - throwData.points <= 1
}

export const playerWinRounds = (player: Player, points: number, throwType: ThrowTypes): boolean => {
    return player.points - points === 0 && throwType === ThrowTypes.DOUBLED
}

export const isNextPlayerThrow = (playerWinRounds: boolean, nextThrow: number): boolean => {
    return playerWinRounds || nextThrow === MAXIMUM_THROW_COUNT
}

export const isGameOver = (players: Player[], rounds: number): boolean => {
    return players.some(player => player.winRounds === rounds)
}