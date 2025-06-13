export type Player = {
    name: string,
    points: number,
    winRounds: number
}

export type GameConfig = {
    players: Player[],
    rounds: number
}
