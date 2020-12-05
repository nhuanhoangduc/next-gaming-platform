import { useState, useEffect } from 'react'
import Promise from 'bluebird'
import _reduce from 'lodash/reduce'
import _uniq from 'lodash/uniq'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _keyBy from 'lodash/keyBy'
import dateSub from 'date-fns/sub'

import roomDb from '@webapp/database/roomDb'
import userDb from '@webapp/database/userDb'

const useRoom = (roomId) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
    })

    const resolveUsers = async (room) => {
        try {
            const users = await Promise.all(_map(room.users, (userId) => userDb.get(userId)))
            room.userDetail = _keyBy(users, '_id')
            return room
        } catch (error) {
            return null
        }
    }

    const fetch = async () => {
        setState({
            loading: true,
            error: null,
            data: null,
        })

        try {
            const result = await roomDb.get(roomId)
            const room = await resolveUsers(result)

            setState({
                loading: false,
                error: null,
                data: room,
            })
        } catch (error) {
            setState({
                loading: false,
                error: error,
                data: null,
            })
        }
    }

    // Fetch data
    useEffect(() => {
        fetch()
    }, [])

    // Traking room changes
    useEffect(() => {
        let changes = null

        if (roomId) {
            changes = roomDb
                .changes({
                    live: true,
                    include_docs: true,
                    doc_ids: [roomId],
                })
                .on('change', async (change) => {
                    const changedRoom = change?.doc
                    setState &&
                        setState((prevState) => ({
                            ...prevState,
                            data: changedRoom,
                        }))
                })
                .on('complete', () => {})
                .on('error', () => {})
        }

        return () => {
            changes && changes.cancel()
        }
    }, [roomId])

    return state
}

export default useRoom
