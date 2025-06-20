export const enum BALDA_GAME_TYPE  {
    USER_AND_USER = 'user-and-user',
    BOT_AND_USER = 'user-and-bot'
}
export type BaldaPlayer = {
    name: string,
    score: number
} 


export type BaldaCellValue = BaldaEmptyCellValue | string
export type BaldaEmptyCellValue = ''
export type BaldaNotTimeLimitForThrow = null
export type BaldaRowValue = BaldaCellValue[]
export type BaldaBoardValue = BaldaRowValue[]
export type BaldaGameConfig = {
    player1: BaldaPlayer,
    player2: BaldaPlayer,
    gameType: BALDA_GAME_TYPE,
    timeLimit: number | BaldaNotTimeLimitForThrow,
    boardSize: number
}