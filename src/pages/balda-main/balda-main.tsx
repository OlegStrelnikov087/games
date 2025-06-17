import { useNavigate } from "react-router-dom"
import './balda-main.css'
export const BaldaMainPage = () => {
    const navigate = useNavigate()
    return (
        <div className="balda-main">
            <h1>Выберите режим игры:</h1>
            <div className="balda-main_actions">
                <button onClick={()=> {navigate('/balda-setup', {state: 'user-and-user'})}}>Против игрока</button>
                <button onClick={()=> {navigate('/balda-setup', {state: 'user-and-bot'})}}> Против бота</button>
            </div>
        </div>
    )
}