import { useCallback } from 'react'
import { useRouter } from 'next/router'

import roomDb from '@webapp/database/roomDb'
import useCurrentUser from '@webapp/hooks/userCurrentUser'
import caroRoomStatuses from '@webapp/constants/caroRoomStatuses'

const RoomFooter = ({ room }) => {
    const currentUser = useCurrentUser()
    const router = useRouter()

    const ownerUser = room?.userDetail?.[room?.ownerUserId]
    const parnerUser = room?.userDetail?.[room?.parnerUserId]

    const handleExitButton = useCallback(async () => {
        const roomInfo = await roomDb.get(room._id)

        if (roomInfo.status === caroRoomStatuses.WAITING_PLAYER) {
            roomInfo.status = caroRoomStatuses.CLOSED
            roomInfo.closedAt = new Date().toISOString()

            await roomDb.put(roomInfo)
        } else if (roomInfo.status === caroRoomStatuses.REQUESTING_NEW_MATCH) {
            const isCurrentUserRoomOwner = roomInfo.ownerUserId === currentUser?._id

            roomInfo.ownerUserId = isCurrentUserRoomOwner ? roomInfo.parnerUserId : roomInfo.ownerUserId
            roomInfo.parnerUserId = null
            roomInfo.status = caroRoomStatuses.WAITING_PLAYER

            await roomDb.put(roomInfo)
        }

        // Redirect rooms page
        router.push('/rooms')
    }, [room, router])

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                width: '100vw',
                borderTop: '1px solid black',
                backgroundColor: 'white',
            }}
        >
            <div className="container">
                <div className="flex items-center" style={{ height: 50 }}>
                    {/* Owner */}
                    <div className="flex-1 flex items-center">
                        {/* Avatar */}
                        <img
                            src={ownerUser?.avatar}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                            }}
                        />

                        {/* Infor */}
                        <div>
                            <p className="ml-1 is-size-6">{ownerUser?.name}</p>
                        </div>
                    </div>

                    {/* New match button */}
                    <button className="mr-2 button is-success is-small">New match</button>

                    {/* Exit button */}
                    <button className="button is-small" onClick={handleExitButton}>
                        Exit
                    </button>

                    {/* Parner */}
                    <div className="flex-1 flex items-center justify-end">
                        {parnerUser && (
                            <>
                                {/* Infor */}
                                <div>
                                    <p className="is-size-6">{parnerUser?.name}</p>
                                </div>

                                {/* Avatar */}
                                <img
                                    src={parnerUser?.avatar}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                    }}
                                    className="ml-1"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomFooter
