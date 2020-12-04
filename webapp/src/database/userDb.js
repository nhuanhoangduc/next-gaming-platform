import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

PouchDB.plugin(PouchFind)

const userDb = new PouchDB('users')

userDb.createIndex({
    index: {
        fields: ['type', 'email'],
    },
})

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

export default userDb
