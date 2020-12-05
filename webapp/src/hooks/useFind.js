import { useState, useEffect } from 'react'

export default (db, query = {}) => {
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
            const result = await db.find(query)
            setState({
                loading: false,
                error: null,
                data: result?.docs || [],
            })
        } catch (error) {
            setState({
                loading: false,
                error: error,
                data: null,
            })
        }
    }

    useEffect(() => {
        const changes = db
            .changes({
                since: 'now',
                live: true,
            })
            .on('change', async () => {
                try {
                    const result = await db.find(query)
                    setState((prevState) => ({
                        ...prevState,
                        data: result?.docs || [],
                    }))
                } catch (error) {}
            })
            .on('complete', () => {})
            .on('error', () => {})

        return () => {
            changes.cancel()
        }
    }, [])

    useEffect(() => {
        fetch()
    }, [])

    return state
}
