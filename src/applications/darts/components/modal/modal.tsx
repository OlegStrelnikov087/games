import type { Player } from "../../types/types"
import './modal.css'
type DartsModalProps = {
    player: Player,
    message: string,
    onStart: () => void
}
export const DartsModal = ({ player, message, onStart }: DartsModalProps) => {
    return (
        <div className="modal-overley">
            <div className="modal-content">
                <h1>{message}</h1>
                <h1>Ходит {player?.name}</h1>
                <h2>Осталось {player?.points}</h2>
                <button onClick={onStart}>Начать ход</button>
            </div>
        </div>
    )
}