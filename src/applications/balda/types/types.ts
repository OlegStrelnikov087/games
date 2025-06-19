export const enum BALDA_GAME_TYPE  {
    USER_AND_USER = 'user-and-user',
    BOT_AND_USER = 'user-and-bot'
}
export type BaldaCellValue = BaldaEmptyCellValue | string
export type BaldaEmptyCellValue = ''
export type BaldaRowValue = BaldaCellValue[]
export type BaldaBoardValue = BaldaRowValue[]
