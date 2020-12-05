import { useState, useEffect } from 'react'
import _reduce from 'lodash/reduce'
import _uniq from 'lodash/uniq'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _keyBy from 'lodash/keyBy'

const useFind = (db, query) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
    })

    const fetch = async () => {
        setState({
            loading: true,
            error: null,
            data: null,
        })

        try {
            const result = await db.find({
                ...query,
                limit: 1,
            })

            setState({
                loading: false,
                error: null,
                data: result?.docs?.[0],
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

    // Traking object changes
    useEffect(() => {
        let changes = null

        if (state.data?._id) {
            changes = db
                .changes({
                    live: true,
                    include_docs: true,
                    doc_ids: [state.data?._id],
                })
                .on('change', async (change) => {
                    try {
                        let result = await db.find({
                            ...query,
                            limit: 1,
                        })
                        setState &&
                            setState((prevState) => ({
                                ...prevState,
                                data: result?.docs?.[0],
                            }))
                    } catch (error) {}
                })
                .on('complete', () => {})
                .on('error', () => {})
        }

        return () => {
            changes && changes.cancel()
        }
    }, [state.data?._id])

    return state
}

export default useFind
