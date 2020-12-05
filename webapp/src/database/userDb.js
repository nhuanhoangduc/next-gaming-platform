/**
 * Model structure
 *
 * _id
 * type: // facebook
 * facebookId
 * name
 * email
 * avatar
 *
 * lastOnline
 * createdAt
 */

import PouchDB from './PouchDb'

const userDb = new PouchDB('http://admin:admin@localhost:5984/userdb')

// Indexing
userDb.createIndex({
    index: {
        fields: ['type', 'email'],
    },
})
export default userDb
