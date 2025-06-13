import './darts-game.css'
import { Target } from "../../applicatoins/darts/components/target/target";
import { useLocation, Navigate } from "react-router-dom";
import type { GameConfig } from '../../applicatoins/darts/types/types';

export const Darts = () => {
    const location = useLocation();
    const gameData = location.state as GameConfig | null;
    const handleScore = (points: number) => {
        console.log(`Вы набрали: ${points} очков`);
    };

    if (!gameData || gameData.players.length < 2) {
        return <Navigate to="/setup" />;
      }

    return (
        <div className='darts-game'>
            <h1>Дартс</h1>
            <div className="target-wrapper">
                <Target onHit={handleScore} />
            </div>
        </div>
    );
}