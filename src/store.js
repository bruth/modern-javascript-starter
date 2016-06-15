import { createStore, applyMiddleware, compose } from 'redux'
import unhandledAction from 'redux-unhandled-action'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

function configureStore(initialState) {
  const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    applyMiddleware(unhandledAction()),
    devTools
  ))
}

export default configureStore
