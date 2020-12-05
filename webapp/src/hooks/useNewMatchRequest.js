import { useState, useEffect } from 'react'
import _reduce from 'lodash/reduce'
import _uniq from 'lodash/uniq'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _keyBy from 'lodash/keyBy'
import dateSub from 'date-fns/sub'

import matchRequestDb from '@webapp/database/matchRequestDb'

const useNewMatchRequest = (roomId) => {
    const [state, setState] = useState(null)

    const fetch = async () => {
        try {
            const result = await matchRequestDb.find({
                selector: {
                    roomId: roomId,
                    closedAt: null,
                    createdAt: {
                        $gte: dateSub(new Date(), {
                            minutes: 1,
                        }).toISOString(),
                    },
                },
                limit: 1,
                sort: [{ createdAt: 'desc' }],
            })
            const matchRequest = result?.docs?.[0]

            setState(matchRequest)
        } catch (error) {
            setState(null)
        }
    }

    // Fetch data
    useEffect(() => {
        fetch()
    }, [roomId])

    // Tracking new match request
    useEffect(() => {
        let changes = null

        if (roomId && !state?._id) {
            changes = matchRequestDb
                .changes({
                    since: 'now',
                    live: true,
                    include_docs: true,
                    filter: function (matchRequest) {
                        return matchRequest.roomId === roomId
                    },
                })
                .on('change', async (change) => {
                    const doc = change?.doc
                    setState && setState(doc)
                })
                .on('complete', () => {})
                .on('error', () => {})
        }

        return () => {
            changes && changes.cancel()
        }
    }, [roomId, state?._id])

    // Traking match request changes
    useEffect(() => {
        let changes = null

        if (state?._id) {
            changes = matchRequestDb
                .changes({
                    live: true,
                    include_docs: true,
                    doc_ids: [state?._id],
                })
                .on('change', async (change) => {
                    const doc = change?.doc
                    setState && setState(doc)
                })
                .on('complete', () => {})
                .on('error', () => {})
        }

        return () => {
            changes && changes.cancel()
        }
    }, [state?._id])

    return state
}

export default useNewMatchRequest
