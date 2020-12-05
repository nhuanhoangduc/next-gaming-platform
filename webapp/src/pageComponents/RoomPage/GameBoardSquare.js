import { useMemo, useCallback } from 'react'
import Image from 'next/image'

import useCurentUser from '@webapp/hooks/userCurrentUser'

const GameBoardSquare = ({ squareSize, row, col, roomRecord }) => {
    const currentUser = useCurentUser()
    const movesRecord = roomRecord?.movesRecord || { '10x30': true }
    const moveIndex = `${row}x${col}`

    const isSquareActive = useMemo(() => {
        return !!movesRecord?.[moveIndex]
    }, [row, col, movesRecord[moveIndex]])
    const isCurrentUserMove = useMemo(() => {
        return currentUser?._id === movesRecord[moveIndex]
    }, [currentUser, movesRecord[moveIndex]])

    const handleSquareClicked = useCallback(() => {
        if (isSquareActive) return
        if (currentUser._id !== roomRecord?.inTurnUserId) return

        console.log('clicked')
    }, [isSquareActive, currentUser, roomRecord?.inTurnUserId])

    return (
        <div
            style={{
                width: squareSize,
                height: squareSize,
                borderLeft: '1px solid gray',
                borderBottom: '1px solid gray',
            }}
            className="flex justify-center items-center"
            onClick={handleSquareClicked}
        >
            {isSquareActive && (
                <Image src={isCurrentUserMove ? '/x.png' : '/o.png'} width={squareSize - 2} height={squareSize - 2} />
            )}
        </div>
    )
}

export default GameBoardSquare
