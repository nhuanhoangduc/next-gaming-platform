/**
 * Model structure
 *
 * _id
 *
 * roomId
 * matchId
 * ownerUserAccepted
 * parnerUserAccepted
 *
 * closedAt
 * createdAt
 */

import PouchDB from './PouchDb'

const matchRequestDb = new PouchDB('match_request_db', { adapter: process.browser ? 'idb' : 'memory' })

if (process.browser) {
    // Sync database
    const remoteDb = new PouchDB('http://admin:admin@localhost:5984/match_request_db')
    matchRequestDb.sync(remoteDb, {
        live: true,
        retry: true,
    })

    // Indexing
    matchRequestDb.createIndex({
        index: {
            fields: ['createdAt'],
        },
    })
}

export default matchRequestDb
