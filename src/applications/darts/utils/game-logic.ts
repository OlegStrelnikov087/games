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

export const playerIsOverdonePoints = (player: Player, throwPoints: number): boolean => {
    return player.points - throwPoints < 2 
}

export const isPlayerWinRounds = (player: Player, points: number, throwType: ThrowTypes): boolean => {
    return player.points - points === 0 && throwType === ThrowTypes.DOUBLED
}

// export const isNextPlayerThrow = (playerWinRounds: boolean, nextThrow: number): boolean => {
//     return playerWinRounds || nextThrow === MAXIMUM_THROW_COUNT
// }
export const isPlayerDidAllThrows = (throwCount: number): boolean => {
    return throwCount===MAXIMUM_THROW_COUNT
}

export const isGameOver = (players: Player[], rounds: number): boolean => {
    return players.some(player => player.winRounds === rounds)
}