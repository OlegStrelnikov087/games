import { useEffect, useState } from "react"
import { BaldaBoardValue, BaldaCellValue } from "../../types/types"
import './balda-board.css'
type BaldaBoardProps = {
    board: BaldaBoardValue,
    size: number,
    onCellClick: (row: number, col: number) => void,
}
export const BaldaBoard = ({ board, size, onCellClick }: BaldaBoardProps) => {
    return (
        <div className="balda-board"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                gridTemplateRows: `repeat(${size}, 1fr)`,
                gap: '4px'
            }}
        >
            {board.map((row, rowId) =>
                row.map((cell, cellId) =>
                (
                    <div key={cellId} id={`row${rowId} cell${cellId}`} className="cell" onClick={() => onCellClick(rowId, cellId)}>{cell}</div>
                )))}

        </div>
    )
}