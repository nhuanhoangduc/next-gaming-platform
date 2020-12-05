import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

// user reducer
import userReducer from './user/reducer'

const middleWares = [thunk]

const composeEnhancers =
    typeof window === 'object' && process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : (middleWares) => middleWares

const enhancer = composeEnhancers(applyMiddleware(...middleWares))

export let store = null
export let persistor = null

if (process.browser) {
    const storage = require('redux-persist/lib/storage').default
    const reducers = combineReducers({
        user: persistReducer(
            {
                key: 'user',
                storage: storage,
            },
            userReducer,
        ),
    })

    store = createStore(reducers, {}, enhancer)
    persistor = persistStore(store)
} else {
    const reducers = combineReducers({
        user: userReducer,
    })
    store = createStore(reducers)
    persistor = persistStore(store)
}

export default store
