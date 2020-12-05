import { useMemo } from 'react'

const GameBoardSquare = ({ squareSize, row, col, movesRecord }) => {
    const isSquareActive = useMemo(() => {
        const moveIndex = `${row}x${col}`
        return !!movesRecord?.[moveIndex]
    }, [row, col, movesRecord])

    console.log(isSquareActive)

    return (
        <div
            style={{
                width: squareSize,
                height: squareSize,
                borderLeft: '1px solid gray',
                borderBottom: '1px solid gray',
            }}
        ></div>
    )
}

export default GameBoardSquare
