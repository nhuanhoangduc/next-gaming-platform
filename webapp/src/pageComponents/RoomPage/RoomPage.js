import dateSub from 'date-fns/sub'

import roomDb from '@webapp/database/roomDb'
import useRoom from '@webapp/hooks/useRoom'
import useNewMatchRequest from '@webapp/hooks/useNewMatchRequest'

import GameBoard from './GameBoard'
import RoomFooter from './RoomFooter'

export const getStaticProps = async (context) => {
    const { params } = context

    try {
        const room = await roomDb.get(params.id)

        return {
            props: {
                roomId: params.id,
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

const RoomPage = ({ roomId }) => {
    const { loading, error, data: room } = useRoom(roomId)
    const matchRequest = useNewMatchRequest(roomId)

    console.log(matchRequest)

    return (
        <div style={{ width: '100vw', height: '100vh' }} className="pt-2 relative flex justify-center">
            <GameBoard />
            <RoomFooter room={room} matchRequest={matchRequest} />
        </div>
    )
}

export default RoomPage
