import { useNavigate } from "react-router-dom"
import './balda-main.css'
import { BALDA_GAME_TYPE } from "../../applications/balda/types/types"
export const BaldaMainPage = () => {
    const navigate = useNavigate()
    return (
        <div className="balda-main">
            <h1>Выберите режим игры:</h1>
            <div className="balda-main_actions">
                <button onClick={()=> {navigate('/balda-setup', {state: BALDA_GAME_TYPE.USER_AND_USER})}}>Против игрока</button>
                <button onClick={()=> {navigate('/balda-setup', {state: BALDA_GAME_TYPE.BOT_AND_USER})}}> Против бота</button>
            </div>
        </div>
    )
}