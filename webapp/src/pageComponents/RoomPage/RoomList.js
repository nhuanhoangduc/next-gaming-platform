import useLastestRooms from '@webapp/hooks/useLastestRooms'

import RoomItem from './RoomItem'

export default () => {
    const { loading, error, data } = useLastestRooms()

    console.log(data)

    if (loading || error) return null

    return (
        <div
            style={{
                border: '1px solid #ededed',
            }}
        ></div>
    )
}
