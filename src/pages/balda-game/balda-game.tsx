import { BaldaBoard } from "../../applications/balda/components/balda-board/balda-board";
import { useLocation } from "react-router-dom"
import { BaldaKeyboard } from "../../applications/balda/components/balda-keyboard/balda-keyboard";
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
        <BaldaKeyboard onKeyClick={(letter)=> console.log(letter)}/>
     </div>   
    )
}
