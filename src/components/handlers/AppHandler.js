import React from 'react'
import {RouteHandler} from 'react-router'
import {HotKeys} from 'react-hotkeys'
import gameActions from '../../actions/gameActions'

class AppHandler extends React.Component {

  static keysPressed = {}

  static hotKeyMap = {
    upStart: {sequence: 'up', action: 'keydown'},
    upEnd: {sequence: 'up', action: 'keyup'},
    downStart: {sequence: 'down', action: 'keydown'},
    downEnd: {sequence: 'down', action: 'keyup'},
    leftStart: {sequence: 'left', action: 'keydown'},
    leftEnd: {sequence: 'left', action: 'keyup'},
    rightStart: {sequence: 'right', action: 'keydown'},
    rightEnd: {sequence: 'right', action: 'keyup'},
    attackStart: {sequence: 'space', action: 'keydown'},
    attackStop: {sequence: 'space', action: 'keyup'}
  }

  static hotKeyHandlers = {
    upStart: startWalkHandler('up'),
    upEnd: stopWalkHandler('up'),
    downStart: startWalkHandler('down'),
    downEnd: stopWalkHandler('down'),
    leftStart: startWalkHandler('left'),
    leftEnd: stopWalkHandler('left'),
    rightStart: startWalkHandler('right'),
    rightEnd: stopWalkHandler('right'),
    attackStart: (e) => {
      e.preventDefault()
      if (AppHandler.keysPressed.attack) return
      AppHandler.keysPressed.attack = true
      gameActions.startAttack()
    },
    attackStop: (e) => {
      e.preventDefault()
      AppHandler.keysPressed.attack = false
      gameActions.stopAttack()
    }
  }

  render () {
    return (
      <HotKeys keyMap={AppHandler.hotKeyMap} handlers={AppHandler.hotKeyHandlers}>
        <div className='handler--app'>
          <RouteHandler/>
          <img className='background' src='images/background.jpg'/>
        </div>
      </HotKeys>
    )
  }
}

// Walk Handlers
function startWalkHandler (dir) {
  return (e) => {
    e.preventDefault()
    if (AppHandler.keysPressed[dir]) return
    AppHandler.keysPressed[dir] = true
    gameActions.startWalk(dir)
  }
}
function stopWalkHandler (dir) {
  return (e) => {
    e.preventDefault()
    AppHandler.keysPressed[dir] = false
    gameActions.stopWalk(dir)
  }
}

export default AppHandler
