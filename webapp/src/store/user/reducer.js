import { handleActions } from 'redux-actions'
import { fromJS } from 'sota-immutable'

const defaultState = {
    currentUser: null,
}

const reducer = handleActions(
    {
        user_RESET: (state, { payload }) => {
            return defaultState
        },

        user_UPDATE_STATE: (state, { payload }) => {
            return fromJS(state).mergeDeep(payload).toJS()
        },

        user_UPDATE_STATE_SHALLOW: (state, { payload }) => {
            return fromJS(state).merge(payload).toJS()
        },
    },
    defaultState,
)

export default reducer
