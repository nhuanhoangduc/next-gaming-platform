import { useState, useEffect } from 'react'
import Promise from 'bluebird'
import _reduce from 'lodash/reduce'
import _uniq from 'lodash/uniq'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _keyBy from 'lodash/keyBy'

import roomDb from '@webapp/database/roomDb'
import userDb from '@webapp/database/userDb'

import useGet from './useGet'

const useRoom = (roomId) => {
    const userResolver = async (room) => {
        const users = await Promise.all(_map(room.users, (userId) => userDb.get(userId)))
        room.userDetail = _keyBy(users, '_id')
        return room
    }
    const { loading, error, data } = useGet(roomDb, roomId, userResolver)

    return { loading, error, data }
}

export default useRoom
