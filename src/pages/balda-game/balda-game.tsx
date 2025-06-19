import { BaldaBoard } from "../../applications/balda/components/balda-board/balda-board";
import { useLocation } from "react-router-dom"

export const BaldaGame = () => {
    const location = useLocation()
    const gameConfig = location.state
    console.log(gameConfig);
    const board = Array(gameConfig.boardSize).fill(Array(gameConfig.boardSize).fill(''))
    console.log(board);
    const handleCellClick = (rowId: number, cellId: number) => {
        console.log(rowId, cellId);
        
    }
    return (
     <div className="balda-game">
        <BaldaBoard board={board} size={gameConfig.boardSize} onCellClick={handleCellClick}/>
     </div>   
    )
}
