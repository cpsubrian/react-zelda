import React from 'react'
import Router, {Route, DefaultRoute, NotFoundRoute} from 'react-router'

import AppHandler from './components/handlers/AppHandler'
import NotFoundHandler from './components/handlers/NotFoundHandler'
import HomeHandler from './components/handlers/HomeHandler'

const routes = (
  <Route path='/' handler={AppHandler}>
    <DefaultRoute handler={HomeHandler}/>
    <NotFoundRoute handler={NotFoundHandler}/>
  </Route>
)

const router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
})

export default router
export {routes, router}
