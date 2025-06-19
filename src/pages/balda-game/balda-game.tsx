import { BaldaBoard } from "../../applications/balda/components/balda-board/balda-board";
import { useLocation } from "react-router-dom"
import { BaldaKeyboard } from "../../applications/balda/components/balda-keyboard/balda-keyboard";
import './balda-game.css'
import { BaldaBoardValue, BaldaCellValue } from "../../applications/balda/types/types";
import { BALDA_EMPTY_CELL_VALUE } from "../../applications/balda/utils/balda-const";
import { useState } from "react";
export const BaldaGame = () => {
    const location = useLocation()
    const gameConfig = location.state
    const boardArr: BaldaBoardValue = Array(gameConfig.boardSize).fill(Array(gameConfig.boardSize).fill(BALDA_EMPTY_CELL_VALUE))
    const [board, setBoard] = useState<BaldaBoardValue>(boardArr)
    const [boardIsClickable, setBoardIsClickable] = useState<boolean>(true)
    const [keyboardIsClickable, setKeyboardIsClickable] = useState<boolean>(false)
    const [selectedCell, setSelectedCell] = useState<[rowId: number, cellId: number] | null>(null)
    const [goToChoseWord, setGoToChoseWord] = useState<boolean>(false)
    const [goToChoseCell, setGoToChoseCell] = useState<boolean>(true)
    const [selectedLetters, setSelectedLetters] = useState<BaldaCellValue[]>([])
    const [enterIsClickable, setEnterIsClickable] = useState<boolean>(false)
    const [backspaceIsClickable, setBackspaceIsClickable] = useState<boolean>(false)

    const handleCellClick = (rowId: number, cellId: number) => {
        if (!boardIsClickable) return
        if (goToChoseCell){
            console.log(rowId, cellId);
            setSelectedCell([rowId, cellId])
            setBoardIsClickable(false)
            setKeyboardIsClickable(true)
            setGoToChoseCell(false)
        }

        if (goToChoseWord) {
            console.log(rowId, cellId);
            const newWord = [...selectedLetters]
            newWord.push(board[rowId][cellId])
            setSelectedLetters(newWord)
            setEnterIsClickable(true)
        }
    }

    const handleKeyClick = (letter: string) => {
        if (!keyboardIsClickable || selectedCell === null) return
        console.log(selectedCell);
        console.log(`${letter} is chosed`);
        const newBoard = [...board.map(row => [...row])]
        newBoard[selectedCell[0]][selectedCell[1]] = letter
        setBoard(newBoard)
        setKeyboardIsClickable(false)
        setBoardIsClickable(true)
        setGoToChoseWord(true)
        setBackspaceIsClickable(true)
    }

    const handleEnterClick = () => {
        if (!enterIsClickable) return
        console.log('enter');
        if (goToChoseWord) {
            console.log(selectedLetters);
            setGoToChoseWord(false)
            setBoardIsClickable(true)
            setEnterIsClickable(false)
            setGoToChoseCell(true)
            setSelectedLetters([])
        }
    }

    const handleBackspaceClick = () => {
        if (!backspaceIsClickable || selectedCell === null) return
        console.log('backspace');
        console.log(`delete ${selectedCell}`);
        const newBoard = [...board]
        newBoard[selectedCell[0]][selectedCell[1]] = BALDA_EMPTY_CELL_VALUE
        setBoard(newBoard)
        setBoardIsClickable(false)
        setGoToChoseWord(false)
        setGoToChoseCell(false)
        setKeyboardIsClickable(true)
        setBackspaceIsClickable(false)
    }

    return (
        <div className="balda-game">
            <div className="board-container">
                <BaldaBoard board={board} size={gameConfig.boardSize} onCellClick={handleCellClick} startWord={['С', 'Л', 'О', 'В', 'О']} />
            </div>
            <div className="keyboard-container">
                <BaldaKeyboard onKeyClick={handleKeyClick} onBackspace={handleBackspaceClick} onEnter={handleEnterClick} />
            </div>
        </div>
    )
}


