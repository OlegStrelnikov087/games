import { BaldaBoardValue } from "../types/types"
import { BALDA_EMPTY_CELL_VALUE } from "./balda-const"

export const getBoardAfterBotThrow = (board: BaldaBoardValue, boardSize: number) => {
    let cell= null
    do {
        
        const randomRowId = Math.floor(Math.random()* boardSize)
        const randomCellId = Math.floor(Math.random()* boardSize)
        const cellValue = 's'
        cell = board[randomRowId][randomCellId]
        console.log(randomRowId, randomCellId, cell);
        if (cell === BALDA_EMPTY_CELL_VALUE) {
            board[randomRowId][randomCellId] = cellValue
            console.log(board);
            
        }
    } while (cell === null || cell !== BALDA_EMPTY_CELL_VALUE)
    
    return board
}