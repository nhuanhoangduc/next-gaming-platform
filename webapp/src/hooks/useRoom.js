import Promise from 'bluebird'
import _reduce from 'lodash/reduce'
import _uniq from 'lodash/uniq'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _keyBy from 'lodash/keyBy'

import roomDb from '@webapp/database/roomDb'
import resolveUsers from '@webapp/utils/resolveUsers'

import useGet from './useGet'

const useRoom = (roomId) => {
    const userResolver = async (room) => {
        room = await resolveUsers(room, [room.ownerUserId, room.parnerUserId])
        return room
    }
    const { loading, error, data } = useGet(roomDb, roomId, userResolver)

    return { loading, error, data }
}

export default useRoom
