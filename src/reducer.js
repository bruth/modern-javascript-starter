import { routerReducer } from 'react-router-redux'

function rootReducer(state = {}, action) {
  return Object.assign({}, state, {
    routing: routerReducer(state.routing, action)
  });
}

export default rootReducer
