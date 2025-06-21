import { BaldaBoard } from "../../applications/balda/components/balda-board/balda-board";
import { useLocation } from "react-router-dom"
import { BaldaKeyboard } from "../../applications/balda/components/balda-keyboard/balda-keyboard";
import './balda-game.css'
import { BALDA_GAME_TYPE, BaldaBoardValue, BaldaCellValue, BaldaPlayer } from "../../applications/balda/types/types";
import { BALDA_EMPTY_CELL_VALUE } from "../../applications/balda/utils/balda-const";
import { useEffect, useState } from "react";
import { getBoardAfterBotThrow } from "../../applications/balda/utils/balda-game-logic";

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
    const [currentPlayerId, setCurrentPlayerId] = useState<number>(0)
    const [players, setPlayers] = useState<[BaldaPlayer, BaldaPlayer]>([gameConfig.player1, gameConfig.player2])
    const [words, setWords] = useState<string[]>([])
    const [startWord, setStartWord] = useState<string[]>([])
    useEffect(() => {
        const loadWords = async () => {
            try {
                const response = await fetch('/singular.txt')
                const text = await response.text()
                const words = text.split('\n').map(word => word.trim().toLowerCase());
                let randomId
                let word
                do {
                    randomId = Math.floor(Math.random()*words.length)
                    word = words[randomId].split('')
                } while (word.length !== gameConfig.boardSize)
                setStartWord(word)
                setStartWord
                setWords(words)
            } catch (error) {
                console.error('Error loading dictionary:', error);
            }
        }
        loadWords()
    }, [])

    useEffect(() => {
        const centerRowId = Math.floor(gameConfig.boardSize / 2)
        const word = [...startWord]
        const newBoard = boardArr.map(row => [...row])
        for (let i = 0; i < word.length; i++) {
            newBoard[centerRowId][i] = word[i]
        }
        setBoard(newBoard)
    }, [gameConfig.boardSize, startWord])


    const handleCellClick = (rowId: number, cellId: number) => {
        if (!boardIsClickable) return
        if (goToChoseCell && board[rowId][cellId] === BALDA_EMPTY_CELL_VALUE) {
            console.log(rowId, cellId);
            setSelectedCell([rowId, cellId])
            setBoardIsClickable(false)
            setKeyboardIsClickable(true)
            setGoToChoseCell(false)
        }

        if (goToChoseWord && board[rowId][cellId] !== BALDA_EMPTY_CELL_VALUE) {
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
    }

    const handleEnterClick = () => {
        if (!enterIsClickable) return
        if (goToChoseWord) {
            console.log(selectedLetters);
            if (words.includes(selectedLetters.join('').toLowerCase())) {
                setGoToChoseWord(false)
                setBoardIsClickable(true)
                setEnterIsClickable(false)
                setGoToChoseCell(true)
                const playersArr = [...players]
                playersArr[currentPlayerId].score += selectedLetters.length
                setSelectedLetters([])
                const newCurrentPlayerId = (currentPlayerId + 1) % players.length
                setSelectedCell(null)
                setCurrentPlayerId(newCurrentPlayerId)
            }
            else {
                console.log('НЕТ ТАКОГО СЛОВА');
                if (selectedCell !== null) {
                    setSelectedLetters([])
                    setGoToChoseCell(true)
                    const newBoard = [...board]
                    newBoard[selectedCell[0]][selectedCell[1]] = BALDA_EMPTY_CELL_VALUE
                    setBoard(newBoard)
                    setSelectedCell(null)
                    setBoardIsClickable(true)
                    setEnterIsClickable(false)
                }
            }
            // if (gameConfig.gameType === BALDA_GAME_TYPE.USER_AND_USER) {
            //     setCurrentPlayerId(newCurrentPlayerId)
            // }
            // if (gameConfig.gameType === BALDA_GAME_TYPE.BOT_AND_USER) {
            //     setTimeout(() => {
            //         const newBoard = [...getBoardAfterBotThrow(board, gameConfig.boardSize)]
            //         setBoard(newBoard)
            //         playersArr[newCurrentPlayerId].score += 5
            //         console.log(`бот сходил на первую клутеку и собрал слово из 5 букв`);
            //     }, 2000)
            //     const lastCurrentPlayerId = (newCurrentPlayerId + 1) % players.length
            //     setCurrentPlayerId(lastCurrentPlayerId)
            // }
        }
    }

    const handleBackspaceClick = () => {
        if (selectedCell === null || board[selectedCell[0]][selectedCell[1]] === BALDA_EMPTY_CELL_VALUE) return
        console.log('backspace');
        console.log(`delete ${selectedCell}`);
        const newBoard = [...board]
        newBoard[selectedCell[0]][selectedCell[1]] = BALDA_EMPTY_CELL_VALUE
        setBoard(newBoard)
        setBoardIsClickable(false)
        setGoToChoseWord(false)
        setGoToChoseCell(false)
        setKeyboardIsClickable(true)
    }

    return (
        <div className="balda-game">
            <div className="player1">
                <h1>{players[0].name}</h1>
                {players[0].score}
            </div>
            <div className="player2">
                <h1>{players[1].name}</h1>
                {players[1].score}
            </div>
            <div className="board-container">
                <BaldaBoard board={board} size={gameConfig.boardSize} onCellClick={handleCellClick} />
            </div>
            <div className="keyboard-container">
                <BaldaKeyboard onKeyClick={handleKeyClick} onBackspace={handleBackspaceClick} onEnter={handleEnterClick} />
            </div>
        </div>
    )
}


