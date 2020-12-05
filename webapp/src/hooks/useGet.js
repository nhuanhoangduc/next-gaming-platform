import { useState, useEffect } from 'react'
import _reduce from 'lodash/reduce'
import _uniq from 'lodash/uniq'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _keyBy from 'lodash/keyBy'

const useGet = (db, id, resolver) => {
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
            let result = await db.get(id)
            resolver && (result = await resolver(result))

            setState({
                loading: false,
                error: null,
                data: result,
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
    }, [db, id])

    // Traking object changes
    useEffect(() => {
        let changes = null

        if (db && id) {
            changes = db
                .changes({
                    live: true,
                    include_docs: true,
                    doc_ids: [id],
                })
                .on('change', async (change) => {
                    let doc = change?.doc
                    if (setState) {
                        try {
                            resolver && (doc = await resolver(doc))
                            setState((prevState) => ({
                                ...prevState,
                                data: doc,
                            }))
                        } catch (error) {}
                    }
                })
                .on('complete', () => {})
                .on('error', () => {})
        }

        return () => {
            changes && changes.cancel()
        }
    }, [db, id])

    return state
}

export default useGet
