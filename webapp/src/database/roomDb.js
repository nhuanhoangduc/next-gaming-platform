/**
 * Model structure
 *
 * _id
 * creatorUserId
 * users: [userId]
 * winnerUserId
 *
 * inTurnUserId
 * movesRecord: {}
 *
 * startedAt
 * lastMoveAt
 * finishedAt
 * createdAt
 */

import PouchDB from './PouchDb'

const roomDb = new PouchDB('http://admin:admin@localhost:5984/roomdb')

export default roomDb
