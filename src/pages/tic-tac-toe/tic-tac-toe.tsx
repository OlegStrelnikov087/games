import { Board } from "../../applicatoins/tic-tac-toe/components/border/board"
import './tic-tac-toe.css'
export const TicTacToe = () => {
    return (
        <div className="tic-tac-toe-page">
            <header>Tic Tac Toe</header>
            <main>
                <Board />
            </main>
        </div>

    )
}