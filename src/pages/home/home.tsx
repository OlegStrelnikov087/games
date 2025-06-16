import { GameCard } from "../../components/game-card/game-card";
export const Home = () => {
    return (
        <div >
          <h1>Добро пожаловать на игровой портал!</h1>
          <div >
            <GameCard
              title="Крестики-нолики"
              description="Классическая игра для двух игроков"
              path="/tic-tac-toe"
            />
            <GameCard
              title="Дартс"
              description="Вирутальный дартс с подсчетом очков"
              path="/darts-setup"
            />
          </div>
        </div>
      );
}