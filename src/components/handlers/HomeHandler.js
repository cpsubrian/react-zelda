import React from 'react'
import {Link} from 'react-router'
import Menu from '../Menu'

class HomeHandler extends React.Component {

  render () {
    return (
      <div className='handler--home'>
        <Menu title='The Legend of Link'>
          <Link to='game'>Start Game</Link>
        </Menu>
      </div>
    )
  }
}

export default HomeHandler
