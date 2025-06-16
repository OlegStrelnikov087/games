import { Link } from "react-router-dom";
import './game-card.css'
interface GameCardProps {
  title: string;
  description: string;
  path: string;
}

export const GameCard =({ title, description, path }: GameCardProps) => {
  return (
    <div className="game-card">
      <h3 className="game-card__title">{title}</h3>
      <p className="game-card__description">{description}</p>
      <Link to={path} className="game-card__link">
        Играть
      </Link>
    </div>
  );
}