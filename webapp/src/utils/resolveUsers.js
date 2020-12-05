import _map from 'lodash/map'
import _keyBy from 'lodash/keyBy'
import Promise from 'bluebird'

import userDb from '@webapp/database/userDb'

const resolveUsers = async (object, userIds) => {
    try {
        const users = await Promise.all(_map(userIds, (userId) => userDb.get(userId)))
        object.userDetail = _keyBy(users, '_id')
        return object
    } catch (error) {
        return null
    }
}

export default resolveUsers
