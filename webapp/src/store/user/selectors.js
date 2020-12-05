import { createSelector } from 'reselect'

export const user_currentUserSelector = createSelector([(store) => store.user.currentUser], (currentUser) => {
    return currentUser
})
