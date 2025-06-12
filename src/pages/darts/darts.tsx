import { Target } from "../../applicatoins/darts/components/target/target";
export const Darts = () => {
    const handleScore = (points: number) => {
        console.log(`Вы набрали: ${points} очков`);
        // Здесь можно добавить логику обработки очков
      };
    
      return (
        <div>
          <h1>Дартс</h1>
          <Target onHit={handleScore} />
        </div>
      );
}