import './balda-timer.css'
type BaldaTimerProps = {
    timeLimit: null | number,
    timeLeft: number,
}
export const BaldaTimer = ({timeLimit, timeLeft}: BaldaTimerProps ) => {
    if (timeLimit === null) {
        return (
            <></>
        );
    }
    return (
        <div className="balda-timer">
            <div className="balda-time-left">
                Осталось: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
        </div>
    );
}