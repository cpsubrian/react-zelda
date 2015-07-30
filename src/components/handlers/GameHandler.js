import React from 'react'
import connectToStores from 'alt/utils/connectToStores'
import gameStore from '../../stores/gameStore'
import GridLayer from '../layers/GridLayer'
import OverlaysLayer from '../layers/OverlaysLayer'

@connectToStores
class GameHandler extends React.Component {

  static propTypes = {
    layers: React.PropTypes.array,
    settings: React.PropTypes.object
  }

  static getStores () {
    return [gameStore]
  }
  static getPropsFromStores () {
    return gameStore.getState()
  }

  renderLayer (layer, num) {
    if (layer.type === 'grid') {
      return (
        <div key={`layer-${num}`} className={'layer' + (layer.base ? ' layer-base' : '')}>
          <GridLayer grid={layer.grid} settings={this.props.settings}/>
        </div>
      )
    }
    if (layer.type === 'overlays') {
      return (
        <div key={`layer-${num}`} className='layer'>
          <OverlaysLayer overlays={layer.overlays} settings={this.props.settings}/>
        </div>
      )
    }
    return null
  }

  render () {
    return (
      <div className='handler--game'>
        <div className='layers'>
          {this.props.layers.map((layer, i) => this.renderLayer(layer, i))}
        </div>
      </div>
    )
  }
}

export default GameHandler
