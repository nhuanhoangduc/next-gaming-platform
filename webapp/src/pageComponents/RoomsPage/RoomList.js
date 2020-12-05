import _map from 'lodash/map'

import useLastestRooms from '@webapp/hooks/useLastestRooms'

import RoomItem from './RoomItem'

const RoomList = () => {
    const { loading, error, data: rooms } = useLastestRooms()

    if (loading || error) return null
    if (rooms.length === 0) return null

    return (
        <div
            style={{
                border: '1px solid #ededed',
            }}
        >
            {_map(rooms, (room) => (
                <RoomItem key={room._id} room={room} />
            ))}
        </div>
    )
}

export default RoomList
