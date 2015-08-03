import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import pureRender from 'pure-render-decorator'
import connectToStores from 'alt/utils/connectToStores'
import gameStore from '../../stores/gameStore'
import Layer from '../Layer'

@pureRender
@connectToStores
class GameHandler extends React.Component {

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    layers: ImmutablePropTypes.list
  }

  static getStores () {
    return [gameStore]
  }
  static getPropsFromStores () {
    return gameStore.getState()
  }

  getStyle () {
    return {
      width: this.props.width,
      height: this.props.height
    }
  }

  render () {
    return (
      <div className='handler--game'>
        <div className='layers' style={this.getStyle()}>
          {this.props.layers.map((layer, num) => {
            return <Layer key={`layer-${num}`} index={num} {...layer.toObject()}/>
          })}
        </div>
      </div>
    )
  }
}

export default GameHandler
