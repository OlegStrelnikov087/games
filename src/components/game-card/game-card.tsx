import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  description: string;
  path: string;
}

export const GameCard =({ title, description, path }: GameCardProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={path}>
        Играть
      </Link>
    </div>
  );
}