import GameBoard from './GameBoard'

import roomDb from '@webapp/database/roomDb'
import useRoom from '@webapp/hooks/useRoom'

export const getStaticProps = async (context) => {
    const { params } = context

    try {
        const room = await roomDb.get(params.id)

        return {
            props: {
                roomId: params.id,
                roomRecordId: params.id,
            },
            notFound: !room,
        }
    } catch (error) {
        return {
            props: {},
            notFound: true,
        }
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

const RoomPage = ({ roomId, roomRecordId }) => {
    const { loading, error, data: room } = useRoom(roomId)
    console.log(room)

    return (
        <div style={{ width: '100vw', height: '100vh' }} className="flex items-center justify-center">
            <GameBoard />
        </div>
    )
}

export default RoomPage
