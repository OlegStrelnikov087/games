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
    const [choseWord, setChoseWord] = useState<boolean>(false)
    const [choseLetter, setChoseLetter] = useState<boolean>(false)
    const [choseCell, setChoseCell] = useState<boolean>(true)
    const [selectedLetters, setSelectedLetters] = useState<BaldaCellValue[]>([])
    const [enterIsClickable, setEnterIsClickable] = useState<boolean>(false)
    const handleCellClick = (rowId: number, cellId: number) => {
        if (!boardIsClickable) return
        if (choseCell) {
            console.log(rowId, cellId);
            setSelectedCell([rowId, cellId])
            setBoardIsClickable(false)
            setKeyboardIsClickable(true)
            setChoseCell(false)
            setChoseLetter(true)
        }
        if (choseWord) {
            console.log(rowId, cellId);
            const newWord = [...selectedLetters]
            newWord.push(board[rowId][cellId])
            setSelectedLetters(newWord)
            setEnterIsClickable(true)
        }
    }

    const handleKeyClick = (letter: string) => {
        if (!keyboardIsClickable) return
        console.log(letter);
        console.log(selectedCell);
        if (selectedCell !== null) {
            console.log('letter is chosed');
            const newBoard = [...board.map(row => [...row])]
            newBoard[selectedCell[0]][selectedCell[1]] = letter
            setBoard(newBoard)
            setKeyboardIsClickable(false)
            setBoardIsClickable(true)
            setChoseLetter(false)
            setChoseWord(true)
        }

    }

    const handleEnterClick = () => {
        if (!enterIsClickable) return
        console.log('enter');
        if (choseWord) {
            console.log(selectedLetters);
            setChoseWord(false)
            setBoardIsClickable(true)
            setEnterIsClickable(false)
            setChoseCell(true)
            setSelectedLetters([])
        }
    }

    const handleBackspaceClick = () => {
        if (keyboardIsClickable) console.log('backspace');
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


