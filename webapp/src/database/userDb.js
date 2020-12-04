import PouchDB from './PouchDb'

const userDb = new PouchDB('users', { adapter: process.browser ? 'idb' : 'memory' })

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
