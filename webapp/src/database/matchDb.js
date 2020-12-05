/**
 * Model structure
 *
 * _id
 *
 * roomId
 * ownerUserId
 * parnerUserId
 *
 * inTurnUserId
 * winnerId
 *
 * movesRecord: {}
 *
 * lastMoveAt
 * finishedAt
 * createdAt
 */

import PouchDB from './PouchDb'

const matchDb = new PouchDB('match_db', { adapter: process.browser ? 'idb' : 'memory' })

if (process.browser) {
    // Sync database
    const remoteDb = new PouchDB('http://admin:admin@localhost:5984/match_db')
    matchDb.sync(remoteDb, {
        live: true,
        retry: true,
    })

    // Indexing
    matchDb.createIndex({
        index: {
            fields: ['roomId'],
        },
    })
}

export default matchDb
