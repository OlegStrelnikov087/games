import { BaldaBoard } from "../../applications/balda/components/balda-board/balda-board";
import { useLocation } from "react-router-dom"
import { BaldaKeyboard } from "../../applications/balda/components/balda-keyboard/balda-keyboard";
import './balda-game.css'
import { BaldaBoardValue } from "../../applications/balda/types/types";
import { BALDA_EMPTY_CELL_VALUE } from "../../applications/balda/utils/balda-const";
export const BaldaGame = () => {
    const location = useLocation()
    const gameConfig = location.state
    console.log(gameConfig);
    const board: BaldaBoardValue = Array(gameConfig.boardSize).fill(Array(gameConfig.boardSize).fill(BALDA_EMPTY_CELL_VALUE))
    console.log(board);
    const handleCellClick = (rowId: number, cellId: number) => {
        console.log(rowId, cellId);
    }
    const handleKeyClick = (letter: string) => {
        console.log(letter);
    }
    return (
        <div className="balda-game">
            <div className="board-container">
                <BaldaBoard board={board} size={gameConfig.boardSize} onCellClick={handleCellClick} startWord={['С', 'Л','О','В','О']}/>
            </div>
            <div className="keyboard-container">
                <BaldaKeyboard onKeyClick={handleKeyClick} />
            </div>
        </div>
    )
}
