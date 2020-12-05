import { createAction } from 'redux-actions'

export const user_RESET = createAction('user_RESET')
export const user_UPDATE_STATE = createAction('user_UPDATE_STATE')
export const user_UPDATE_STATE_SHALLOW = createAction('user_UPDATE_STATE_SHALLOW')

export const user_SET_CURRENT_USER = (currentUser) => (dispatch) => {
    if (currentUser) {
        dispatch(
            user_UPDATE_STATE({
                currentUser: currentUser,
            }),
        )
    } else {
        dispatch(
            user_UPDATE_STATE_SHALLOW({
                currentUser: null,
            }),
        )
    }
}
