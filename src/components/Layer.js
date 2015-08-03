import React from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import pureRender from 'pure-render-decorator'
import Tile from './Tile'
import Character from './Character'

@pureRender
class Layer extends React.Component {

  static propTypes = {
    style: ImmutablePropTypes.map,
    tiles: ImmutablePropTypes.list,
    characters: ImmutablePropTypes.list
  }

  static defaultProps = {
    style: Immutable.Map({}),
    tiles: Immutable.List([]),
    characters: Immutable.List([])
  }

  render () {
    return (
      <div className='layer' style={this.props.style.toJS()}>
        {this.props.tiles.map((tile, i) => {
          return <Tile key={`tile-${i}`} {...tile.toObject()}/>
        })}
        {this.props.characters.map((character, i) => {
          return <Character key={`character-${i}`} {...character.toObject()}/>
        })}
      </div>
    )
  }
}

export default Layer
