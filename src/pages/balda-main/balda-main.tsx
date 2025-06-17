import { useNavigate } from "react-router-dom"
export const BaldaMainPage = () => {
    const navigate = useNavigate()
    // const handleGoToUsersSetup = () => {
    //     const gameType = 'user-and-user'
    //     navigate('/balda-setup', {state: gameType})
        
    // }
    // const handleGoToBotSetup = () => {
    //     const gameType = 'user-and-bot'
    //     navigate('/balda-setup', {state: gameType})
    // }
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