import React from 'react'
import {RouteHandler, Link} from 'react-router'
import {HotKeys} from 'react-hotkeys'
import gameActions from '../../actions/gameActions'

class AppHandler extends React.Component {

  static hotKeyHandlers = {
    'up': (e) => {
      gameActions.walk('up')
    },
    'down': (e) => {
      gameActions.walk('down')
    },
    'left': (e) => {
      gameActions.walk('left')
    },
    'right': (e) => {
      gameActions.walk('right')
    }
  }

  render () {
    return (
      <HotKeys handlers={AppHandler.hotKeyHandlers}>
        <div className='handler--app'>
          <RouteHandler/>
          <img className='background' src='images/background.jpg'/>
        </div>
      </HotKeys>
    )
  }
}

export default AppHandler
