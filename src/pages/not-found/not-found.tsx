import { useNavigate } from "react-router-dom";

export const  NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, запрашиваемая страница не существует.</p>
      <button onClick={() => navigate("/")}>Вернуться на главную</button>
    </div>
  );
}