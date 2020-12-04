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

const userDb = new PouchDB('users', { adapter: process.browser ? 'idb' : 'memory' })

if (process.browser) {
    // Sync database
    const remoteUserDb = new PouchDB('http://admin:admin@localhost:5984/userdb')
    userDb.sync(remoteUserDb, {
        live: true,
        retry: false,
    })

    // Indexing
    userDb.createIndex({
        index: {
            fields: ['type', 'email'],
        },
    })
}

export default userDb
