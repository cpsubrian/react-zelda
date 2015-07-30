import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import pureRender from 'pure-render-decorator'
import connectToStores from 'alt/utils/connectToStores'
import gameStore from '../../stores/gameStore'
import GridLayer from '../layers/GridLayer'
import OverlaysLayer from '../layers/OverlaysLayer'

@pureRender
@connectToStores
class GameHandler extends React.Component {

  static propTypes = {
    layers: ImmutablePropTypes.list,
    settings: ImmutablePropTypes.map
  }

  static getStores () {
    return [gameStore]
  }
  static getPropsFromStores () {
    return gameStore.getState()
  }

  renderLayer (layer, num) {
    if (layer.get('type') === 'grid') {
      return (
        <div key={`layer-${num}`} className={'layer' + (layer.get('base') ? ' layer-base' : '')}>
          <GridLayer grid={layer.get('grid')} settings={this.props.settings}/>
        </div>
      )
    }
    if (layer.get('type') === 'overlays') {
      return (
        <div key={`layer-${num}`} className='layer'>
          <OverlaysLayer overlays={layer.get('overlays')} settings={this.props.settings}/>
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
