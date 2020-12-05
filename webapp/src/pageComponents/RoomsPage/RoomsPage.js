import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import useCurrentUser from '@webapp/hooks/userCurrentUser'
import roomDb from '@webapp/database/roomDb'
import caroRoomStatuses from '@webapp/constants/caroRoomStatuses'

import RoomList from './RoomList'

const RoomsPage = () => {
    const [state, setState] = useState({
        creatingRoom: false,
    })
    const currentUser = useCurrentUser()
    const router = useRouter()

    const handleCreateRoomButton = useCallback(async () => {
        if (state.creatingRoom) return

        setState((prevState) => ({
            ...prevState,
            creatingRoom: true,
        }))

        const newRoomId = uuidv4()
        const currentDate = new Date().toISOString()

        const newRoom = {
            _id: newRoomId,

            ownerUserId: currentUser._id,
            parnerUserId: null,
            matchId: null,

            status: caroRoomStatuses.WAITING_PLAYER,

            closedAt: null,
            createdAt: currentDate,
        }

        try {
            await roomDb.put(newRoom)
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                creatingRoom: false,
            }))
        }

        router.push('/room/' + newRoomId)
    }, [currentUser, state.creatingRoom, router])

    return (
        <div className="container is-max-desktop pt-5">
            {/* Create button */}
            <div className="flex items-end">
                {/* Button */}
                <button
                    className={classNames('button is-primary is-small', {
                        'is-loading': state.creatingRoom,
                    })}
                    onClick={handleCreateRoomButton}
                >
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
