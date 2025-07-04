type BaldaCounterProps = {
    name: string,
    score: number
}
export const BaldaCounter = ({name, score}:BaldaCounterProps) => {
    return (
        <div className="balda-counter">
            <p>Игрок {name}</p>
            <p>очки {score}</p>
        </div>
    )
}