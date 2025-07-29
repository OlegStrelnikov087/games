import { useState } from "react"
import { BaldaBoardValue } from "../../types/types"
import './balda-board.css'
type BaldaBoardProps = {
    board: BaldaBoardValue,
    size: number,
    onCellClick: (row: number, col: number) => void,
    isGoToSelectCell: boolean,
    isGoToSelectWord: boolean
}
export const BaldaBoard = ({ board, size, onCellClick, isGoToSelectCell, isGoToSelectWord}: BaldaBoardProps) => {
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)

    const handleCellClick = (rowId: number, cellId: number) => {
        setSelectedCell([rowId, cellId]);
        onCellClick(rowId, cellId);
        console.log(isGoToSelectCell, isGoToSelectWord, selectedCell && selectedCell[0]===rowId && selectedCell[1]===cellId);
        
    }

    return (
        <div className="balda-board"
            style={{
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                gridTemplateRows: `repeat(${size}, 1fr)`,
            }}
        >
            {board.map((row, rowId) =>
                row.map((cell, cellId) =>
                (
                    <div key={cellId} id={`row${rowId} cell${cellId}`} className='balda-cell' onClick={() => handleCellClick(rowId, cellId) }>
                        {cell}
                    </div>
                )))}

        </div>
    )
}