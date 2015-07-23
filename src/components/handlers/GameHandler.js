import React from 'react'
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import connectToStores from 'alt/utils/connectToStores'
import gameStore from '../../stores/gameStore'
import GameGrid from '../GameGrid'

@connectToStores
class GameHandler extends React.Component {

  static propTypes = {
    grid: React.PropTypes.array,
    hero: React.PropTypes.object
  }

  static getStores () {
    return [gameStore]
  }
  static getPropsFromStores () {
    return gameStore.getState()
  }

  render () {
    return (
      <div className='handler--game'>
        <CSSTransitionGroup transitionName='game' transitionAppear={true}>
          <div className='game'>
            <GameGrid grid={this.props.grid} hero={this.props.hero}/>
          </div>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default GameHandler
