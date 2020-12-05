import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useCurrentUser from '@webapp/hooks/userCurrentUser'
import roomDb from '@webapp/database/roomDb'

import RoomList from './RoomList'

export default () => {
    const currentUser = useCurrentUser()

    const handleCreateRoomButton = useCallback(async () => {
        const newRoom = {
            _id: uuidv4(),
            creatorUserId: currentUser._id,
            users: [currentUser._id],
            winnerUserId: null,

            inTurnUserId: currentUser._id,
            movesRecord: {},

            startedAt: null,
            lastMoveAt: null,
            finishedAt: null,
            createdAt: new Date().toISOString(),
        }

        await roomDb.put(newRoom)
    }, [currentUser])

    return (
        <div className="container is-max-desktop pt-5">
            {/* Create button */}
            <div className="flex items-end">
                {/* Button */}
                <button className="button is-primary" onClick={handleCreateRoomButton}>
                    New room
                </button>
            </div>
            <hr className="my-2" />

            {/* Room list */}
            <RoomList />
        </div>
    )
}
