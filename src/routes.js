import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/app'
import Index from './components/index'

let router = (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
  </Route>
);

export default router
