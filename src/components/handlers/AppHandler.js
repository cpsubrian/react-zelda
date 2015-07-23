import React from 'react'
import {RouteHandler} from 'react-router'

class AppHandler extends React.Component {

  render () {
    return (
      <div className='handler--app'>
        <RouteHandler/>
      </div>
    )
  }
}

export default AppHandler
