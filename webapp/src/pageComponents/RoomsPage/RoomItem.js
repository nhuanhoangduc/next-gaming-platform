import { useCallback } from 'react'
import { useRouter } from 'next/router'
import dateFormatDistanceToNow from 'date-fns/formatDistanceToNow'

import roomDb from '@webapp/database/roomDb'
import useCurrentUser from '@webapp/hooks/userCurrentUser'
import caroRoomStatuses from '@webapp/constants/caroRoomStatuses'

const RoomItem = ({ room }) => {
    const currentUser = useCurrentUser()
    const router = useRouter()

    const creatorUser = room?.userDetail?.[room?.ownerUserId]

    const handleRoomClicked = useCallback(async () => {
        if (!currentUser || !room) return

        try {
            const roomInfo = await roomDb.get(room?._id)

            if (room?.ownerUserId === currentUser?._id || room?.parnerUserId === currentUser?._id) {
                router.push('/room/' + roomInfo._id)
                return
            }

            if (room?.status === caroRoomStatuses.WAITING_PLAYER && room?.parnerUserId === null) {
                roomInfo.parnerUserId = currentUser?._id
                roomInfo.status = caroRoomStatuses.REQUESTING_NEW_MATCH

                await roomDb.put(roomInfo)

                router.push('/room/' + roomInfo._id)
            }
        } catch (error) {}
    }, [room, currentUser, router])

    if (!room) return null

    return (
        <a className="panel-block" style={{ justifyContent: 'space-between' }} onClick={handleRoomClicked}>
            {/* Creator */}
            <div className="flex items-center">
                {/* Avatar */}
                <img
                    style={{ borderRadius: '50%' }}
                    src={creatorUser?.avatar}
                    alt={creatorUser?.name}
                    width={40}
                    height={40}
                />

                {/* Name */}
                <p className="ml-3 text-md">{creatorUser?.name}</p>
            </div>

            {/* Date */}
            <p className="text-sm italic has-text-dark">
                {dateFormatDistanceToNow(room?.createdAt ? new Date(room.createdAt) : new Date(), {
                    includeSeconds: true,
                })}
            </p>
        </a>
    )
}

export default RoomItem
