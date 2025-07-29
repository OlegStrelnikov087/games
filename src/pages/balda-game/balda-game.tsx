import { BaldaBoard } from "../../applications/balda/components/balda-board/balda-board";
import { useLocation } from "react-router-dom"
import { BaldaKeyboard } from "../../applications/balda/components/balda-keyboard/balda-keyboard";
import './balda-game.css'
import { BALDA_GAME_TYPE, BaldaBoardValue, BaldaCellValue, BaldaPlayer } from "../../applications/balda/types/types";
import { BALDA_EMPTY_CELL_VALUE } from "../../applications/balda/utils/balda-const";
import { useEffect, useRef, useState } from "react";
import { BaldaTimer } from "../../applications/balda/components/balda-timer/balda-timer";
import { BaldaCounter } from "../../applications/balda/components/balda-counter/balda-counter";
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
    const [timeLeft, setTimeLeft] = useState<number>(gameConfig.timeLimit);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

    useEffect(() => {
        const loadWords = async () => {
            try {
                const response = await fetch('/singular.txt')
                const text = await response.text()
                const words = text.split('\n').map(word => word.trim().toLowerCase());
                let randomId
                let word
                do {
                    randomId = Math.floor(Math.random() * words.length)
                    word = words[randomId].split('')
                } while (word.length !== gameConfig.boardSize)
                words.splice(words.indexOf(word.join('')), 1)
                setStartWord(word)
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
            newBoard[centerRowId][i] = word[i].toLocaleUpperCase()
        }
        setBoard(newBoard)
    }, [gameConfig.boardSize, startWord])

    useEffect(() => {
        setTimeLeft(gameConfig.timeLimit); // Сброс таймера при смене игрока
        setIsTimerActive(true);

        if (gameConfig.timeLimit === null) return;

        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    handleTimeEnd();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [currentPlayerId, gameConfig.timeLimit]);

    const handleTimeEnd = () => {
        setIsTimerActive(false);
        // Здесь логика окончания времени
        alert('Время вышло!');
        // Передаем ход следующему игроку
        const nextPlayerId = (currentPlayerId + 1) % players.length;
        setCurrentPlayerId(nextPlayerId);
    };

    const handleCellClick = (rowId: number, cellId: number) => {
        if (!boardIsClickable) return
        if (goToChoseCell && board[rowId][cellId] === BALDA_EMPTY_CELL_VALUE) {
            setSelectedCell([rowId, cellId])
            setBoardIsClickable(false)
            setKeyboardIsClickable(true)
            setGoToChoseCell(false)
        }

        if (goToChoseWord && board[rowId][cellId] !== BALDA_EMPTY_CELL_VALUE) {
            const newWord = [...selectedLetters]
            newWord.push(board[rowId][cellId])
            setSelectedLetters(newWord)
            setEnterIsClickable(true)
        }

    }

    const handleKeyClick = (letter: string) => {
        if (!keyboardIsClickable || selectedCell === null) return
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
                const newWords = [...words]
                newWords.splice(words.indexOf(selectedLetters.join('').toLowerCase()), 1)
                setWords(newWords)
            }
            else {
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
        }
    }

    const handleBackspaceClick = () => {
        if (selectedCell === null || board[selectedCell[0]][selectedCell[1]] === BALDA_EMPTY_CELL_VALUE) return
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
            <div className="balda-timer">
                <BaldaTimer timeLimit={gameConfig.timeLimit} timeLeft={timeLeft} />
            </div>

            <div className="balda-counters-container">
                {players.map((player, playerId) => (
                    <BaldaCounter key={playerId} name={player.name} score={player.score} />
                )
                )}
            </div>

            <div className="board-container">
                <BaldaBoard board={board} size={gameConfig.boardSize} onCellClick={handleCellClick} isGoToSelectCell={goToChoseCell} isGoToSelectWord={goToChoseWord} />
            </div>
            <div className="keyboard-container">
                <BaldaKeyboard onKeyClick={handleKeyClick} onBackspace={handleBackspaceClick} onEnter={handleEnterClick} />
            </div>
        </div>
    )
}


