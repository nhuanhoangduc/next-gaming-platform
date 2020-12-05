/**
 * Model structure
 *
 * _id
 *
 * ownerUserId
 * parnerUserId
 * matchId
 *
 * status: WAITING_PLAYER, REQUESTING_NEW_MATCH, PLAYING, CLOSED
 * closedAt
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
