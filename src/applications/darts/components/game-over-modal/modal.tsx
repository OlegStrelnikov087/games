import './modal.css'
import { useNavigate } from "react-router-dom"
type GameOverModal = {
    handleRestartGame: () => void,
}
export const GameOverModal = ({ handleRestartGame }: GameOverModal) => {
    const navigate = useNavigate()
    return (
        <div className="game-over-modal-overley">
            <div className="game-over-modal-content">
                <h1>Игра окончена</h1>
                <h2>Выберите дальнейшее дествие</h2>
                <div className="game-over-modal-actions">
                    <button className='modal-actions-btn restart-game' onClick={handleRestartGame}>Сыграть еще раз</button>
                    <button className='modal-actions-btn go-to-setup' onClick={() => navigate('/darts-setup')}>
                        К настройкам
                    </button>
                    <button className='modal-actions-btn exit-game' onClick={() => navigate('/')}>
                        Выйти из Дартс
                    </button>
                </div>
            </div>
        </div>
    )
}