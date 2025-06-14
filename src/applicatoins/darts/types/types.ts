export type Player = {
    name: string,
    points: number,
    winRounds: number
}

export type GameConfig = {
    players: Player[],
    rounds: number,
    startPoints: number
}

export enum ThrowTypes  {
    MISSED = 'missed',
    STANDARTED = 'standarted',
    DOUBLED = 'doubled',
    TRIPLED = 'tripled',
    GREEN_BULL = 'greenBull',
    RED_BULL = 'redBull'
}

export type ThrowData = {
    points: number,
    throwType: ThrowTypes
}