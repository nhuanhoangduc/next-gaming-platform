/**
 * Model structure
 *
 * _id
 *
 * roomId
 * inTurnUserId
 * winnerUserId
 *
 * movesRecord: {}
 *
 * lastMoveAt
 * createdAt
 */

import PouchDB from './PouchDb'

const roomRecordDb = new PouchDB('room_record_db', { adapter: process.browser ? 'idb' : 'memory' })

if (process.browser) {
    // Sync database
    const remoteDb = new PouchDB('http://admin:admin@localhost:5984/room_record_db')
    roomRecordDb.sync(remoteDb, {
        live: true,
        retry: true,
    })

    // Indexing
    roomRecordDb.createIndex({
        index: {
            fields: ['roomId'],
        },
    })
}

export default roomRecordDb
