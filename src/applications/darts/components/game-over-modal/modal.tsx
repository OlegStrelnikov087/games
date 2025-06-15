import { Link } from "react-router-dom"
import './modal.css'
type GameOverModal = {
    handleRestartGame: () => void
}
export const GameOverModal = ({ handleRestartGame }: GameOverModal) => {
    return (
        <div className="game-over-modal-overley">
            <div className="game-over-modal-content">
                <h1>Игра окончена</h1>
                <h2>Выберите дальнейшее дествие</h2>
                <button onClick={handleRestartGame}>Сыграть еще раз</button>
                <button><Link to={'/'}>Выйти из Дартс</Link></button>
                <button><Link to={'/darts-setup'}>К настройкам</Link></button>
            </div>
        </div>
    )
}