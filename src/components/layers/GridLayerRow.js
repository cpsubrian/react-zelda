import React from 'react'
import _ from 'lodash'
import ImmutablePropTypes from 'react-immutable-proptypes'
import * as sprites from '../../sprites'
import gameStore from '../../stores/gameStore'

class GridLayerRow extends React.Component {

  static propTypes = {
    grid: ImmutablePropTypes.list,
    row: ImmutablePropTypes.list,
    num: React.PropTypes.number
  }

  // Not using pureRender because we don't care if the whole grid changes,
  // only our row and the row above or below us.
  shouldComponentUpdate (nextProps, nextState) {
    // Did num or row change?
    if ((nextProps.row !== this.props.row) || (nextProps.num !== this.props.num)) {
      return true
    }

    // Did the row above or below us change?
    let num = this.props.num
    if ((num > 0) && (nextProps.grid.get(num - 1) !== this.props.grid.get(num - 1))) {
      return true
    }
    if ((num < nextProps.grid.size) && (nextProps.grid.get(num + 1) !== this.props.grid.get(num + 1))) {
      return true
    }

    return false
  }

  renderCell (tile, x, y) {
    return (
      <div key={'cell-' + x} className='grid-cell'>
        <div className='grid-base' style={this.getStyle('overworld', tile.type, 'base')}/>
        {this.renderOverlays(tile, x, y)}
        {this.renderDecorations(tile, x, y)}
      </div>
    )
  }

  renderOverlays (tile, x, y) {
    let overlays = []
    if (tile.type === 'grass') {
      overlays = overlays.concat(this.renderOverlaySides('water', x, y))
    }
    if (tile.type === 'tree-trunk') {
      overlays = overlays.concat(this.renderOverlaySides('tree-trunk', x, y))
    }
    if (tile.type === 'tree') {
      overlays = overlays.concat(this.renderOverlaySides('tree', x, y))
    }
    return overlays
  }

  renderDecorations (tile, x, y) {
    let decorations = []
    if (typeof tile.getDecorations === 'function') {
      _.each(tile.getDecorations(), (decoration, i) => {
        let style = _.extend(this.getStyle(decoration.sprite, tile.type, 'decorations', decoration.type), decoration.style)
        decorations.push(
          <div key={`decoration.${i}`} className='grid-decoration' style={style}/>
        )
      })
    }
    return decorations
  }

  renderOverlaySides (tileType, x, y) {
    let sides = this.getSides(tileType, x, y)
    return sides.map((side) => {
      let style = this.getStyle('overworld', tileType, 'overlays', side)
      if (style) {
        return <div key={`side.${tileType}.${side}`} className='grid-overlay' style={style}/>
      } else {
        return null
      }
    })
  }

  getStyle (spriteName, tileType, ...path) {
    let style = _.reduce(path, (part, key) => {
      if (!part) return false
      return part[key] || false
    }, sprites[spriteName].tiles[tileType])

    if (style) {
      return _.extend(
        {},
        sprites[spriteName].base,
        style
      )
    } else {
      return false
    }
  }

  getSides (type, x, y) {
    let sides = [
      {name: 'below', x, y: y + 1},
      {name: 'above', x, y: y - 1},
      {name: 'left', x: x - 1, y},
      {name: 'right', x: x + 1, y},
      {name: 'diag-top-left', x: x - 1, y: y - 1},
      {name: 'diag-top-right', x: x + 1, y: y - 1},
      {name: 'diag-bottom-left', x: x - 1, y: y + 1},
      {name: 'diag-bottom-right', x: x + 1, y: y + 1}
    ]
    let orth = sides
      .filter((side) => {
        return side.x >= 0 && side.y >= 0
      })
      .filter((side) => {
        let tile = gameStore.getTile(this.props.grid, side.x, side.y)
        return !!tile && (tile.type === type)
      })
      .map((side) => {
        return side.name
      })
    let checkDiag = [
      ['diag-top-left', 'above', 'left'],
      ['diag-top-right', 'above', 'right'],
      ['diag-bottom-left', 'below', 'left'],
      ['diag-bottom-right', 'below', 'right']
    ]
    checkDiag.forEach((diag) => {
      if (_.includes(orth, diag[1]) || _.includes(orth, diag[2])) {
        orth = _.without(orth, diag[0])
      }
    })
    let corners = [
      ['below', 'right'],
      ['below', 'left'],
      ['above', 'right'],
      ['above', 'left']
    ]
    let results = orth.concat(corners
      .filter((sides) => {
        return _.includes(orth, sides[0]) && _.includes(orth, sides[1])
      })
      .map((sides) => {
        return sides.join('-')
      })
    )
    return results
  }

  render () {
    console.log('render row')
    return (
      <div className='grid-row'>
        {this.props.row.map((tile, i) => {
          return this.renderCell(tile, i, this.props.num)
        })}
      </div>
    )
  }

}

export default GridLayerRow
