import './darts.css'
import { Target } from "../../applicatoins/darts/components/target/target";
export const Darts = () => {
    const handleScore = (points: number) => {
        console.log(`Вы набрали: ${points} очков`);
    };

    return (
        <div className='darts-game'>
            <h1>Дартс</h1>
            <div className="target-wrapper">
                <Target onHit={handleScore} />
            </div>
        </div>
    );
}