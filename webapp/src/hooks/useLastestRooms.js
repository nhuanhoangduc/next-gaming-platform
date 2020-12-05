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

export default () => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
    })

    const currentDate = new Date()
    const query = {
        selector: {
            startedAt: null,
            finishedAt: null,
            createdAt: {
                $gte: dateSub(currentDate, {
                    hours: 1,
                }).toISOString(),
            },
        },
        limit: 50,
        sort: [{ createdAt: 'desc' }],
    }

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
            const result = await roomDb.find(query)
            const rooms = await Promise.map(result?.docs, (room) => resolveUsers(room))

            setState({
                loading: false,
                error: null,
                data: _filter(rooms, (room) => room),
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

    // Tracking new room
    useEffect(() => {
        const changes = roomDb
            .changes({
                since: 'now',
                live: true,
                include_docs: true,
                filter: function (room) {
                    return !room.startedAt && !room.finishedAt
                },
            })
            .on('change', async (change) => {
                try {
                    const newRoom = await resolveUsers(change?.doc)
                    newRoom &&
                        setState((prevState) => ({
                            ...prevState,
                            data: [newRoom, ...prevState.data],
                        }))
                } catch (error) {}
            })
            .on('complete', () => {})
            .on('error', () => {})

        return () => {
            changes.cancel()
        }
    }, [])

    // Tracking room changes
    useEffect(() => {
        let changes = null

        if (state.data && state.data.length > 0) {
            const roomIds = _map(state.data, (room) => room._id)
            changes = roomDb
                .changes({
                    since: 'now',
                    live: true,
                    include_docs: true,
                    doc_ids: roomIds,
                })
                .on('change', async (change) => {
                    const changedRoom = change?.doc

                    // Room is unavailable, remove it from room list
                    if (changedRoom?.startedAt || changedRoom?.finishedAt) {
                        setState((prevState) => ({
                            ...prevState,
                            data: _filter(prevState.data, (room) => room._id !== changedRoom._id),
                        }))
                    }
                })
                .on('complete', () => {})
                .on('error', () => {})
        }

        return () => {
            changes && changes.cancel()
        }
    }, [state.data])

    return state
}
