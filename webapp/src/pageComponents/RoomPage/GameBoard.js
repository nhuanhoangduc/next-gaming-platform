import { useState, useEffect } from 'react'
import _map from 'lodash/map'

import caroRoomConfig from '@webapp/configs/caroRoomConfig'

import GameBoardSquare from './GameBoardSquare'

const GameBoard = () => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    })
    const boardSize = Math.min(windowSize.width, windowSize.height) - 20
    const squareSize = boardSize / caroRoomConfig.BOARD_SQUARE

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight - 50,
        })
    }, [])

    if (boardSize <= 0) return null

    return (
        <div style={{ width: boardSize, height: boardSize, boxSizing: 'border-box' }}>
            {/* Render rows */}
            {_map(new Array(caroRoomConfig.BOARD_SQUARE), (x, rowIndex) => (
                <div
                    key={rowIndex + 1}
                    style={{
                        height: squareSize,
                        width: boardSize,
                        borderTop: '1px solid gray',
                        borderRight: '1px solid gray',
                    }}
                    className="flex"
                >
                    {/* Render cols */}
                    {_map(new Array(caroRoomConfig.BOARD_SQUARE), (y, colIndex) => (
                        <GameBoardSquare
                            key={`${rowIndex + 1}x${colIndex + 1}`}
                            squareSize={squareSize}
                            row={rowIndex + 1}
                            col={colIndex + 1}
                            roomRecord={{}}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GameBoard
