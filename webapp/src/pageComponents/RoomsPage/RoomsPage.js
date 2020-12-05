import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useCurrentUser from '@webapp/hooks/userCurrentUser'
import roomDb from '@webapp/database/roomDb'
import roomRecordDb from '@webapp/database/roomRecordDb'

import RoomList from './RoomList'

const RoomsPage = () => {
    const currentUser = useCurrentUser()

    const handleCreateRoomButton = useCallback(async () => {
        const newRoomId = uuidv4()
        const newRoomRecordId = uuidv4()
        const currentDate = new Date().toISOString()

        const newRoom = {
            _id: newRoomId,

            creatorUserId: currentUser._id,
            users: [currentUser._id],
            winnerUserId: null,
            roomRecordId: newRoomRecordId,

            startedAt: null,
            finishedAt: null,
            createdAt: currentDate,
        }
        const newRoomRecord = {
            _id: newRoomRecordId,

            roomId: newRoomId,
            inTurnUserId: currentUser._id,
            winnerUserId: null,

            movesRecord: {},

            lastMoveAt: null,
            createdAt: currentDate,
        }

        await Promise.all([roomDb.put(newRoom), roomRecordDb.put(newRoomRecord)])
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

export default RoomsPage
