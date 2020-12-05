/**
 * Model structure
 *
 * _id
 *
 * creatorUserId
 * users: [userId]
 * winnerUserId
 * roomRecordId
 *
 * startedAt
 * finishedAt
 * createdAt
 */

import PouchDB from './PouchDb'

const roomDb = new PouchDB('http://admin:admin@localhost:5984/room_db')

// Indexing
roomDb.createIndex({
    index: {
        fields: ['createdAt'],
    },
})

export default roomDb
