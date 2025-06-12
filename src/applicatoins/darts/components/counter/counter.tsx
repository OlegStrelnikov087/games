import { type Player } from "../../types/types"
interface CounterProps {
    player: Player
}
export const Counter = ({player}) => {
    return (
        <div className="counter">
            <div className="name">{player.name}</div>
            <div className="points">{player.points}</div>
            <div className="winRounds">{player.winRounds}</div>
        </div>
    )
}