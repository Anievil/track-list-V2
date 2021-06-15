import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagaWatcher from '../sagas/rootSaga'
import allReducers from '../reducers/index'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(allReducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagaWatcher)

export default store