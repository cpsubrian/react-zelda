import React from 'react'
import _ from 'lodash'
import terrainSprite from '../sprites/terrain'
import Hero from './Hero'
import gameStore from '../stores/gameStore'

class GameGrid extends React.Component {

  static propTypes = {
    grid: React.PropTypes.array,
    hero: React.PropTypes.object
  }

  renderRow (row, rowNum) {
    return (
      <div key={'row-' + rowNum} className='game-grid-row'>
        {row.map((tile, i) => {
          return this.renderCell(tile, i, rowNum)
        })}
      </div>
    )
  }

  renderCell (tile, x, y) {
    return (
      <div key={'cell-' + x} className='game-grid-cell'>
        <div className='game-grid-base' style={this.getStyle(tile.type, 'base')}/>
        {this.renderOverlays(tile, x, y)}
        {(this.props.hero.position.x === x && this.props.hero.position.y === y) ?
          <Hero {...this.props.hero}/>
        : null}
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
    return overlays
  }

  renderOverlaySides (tileType, x, y) {
    let sides = this.getSides(tileType, x, y)
    return sides.map((side) => {
      let style = this.getStyle(tileType, 'overlays', side)
      if (style) {
        return <div key={`side.${tileType}.${side}`} className='game-grid-overlay' style={style}/>
      } else {
        return null
      }
    })
  }

  getStyle (tileType, ...path) {
    let style = _.reduce(path, (part, key) => {
      if (!part) return false
      return part[key] || false
    }, terrainSprite.tiles[tileType])

    if (style) {
      return _.extend(
        {},
        terrainSprite.base,
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
    let rows = this.props.grid.map((row, i) => {
      return this.renderRow(row, i)
    })
    return (
      <div className='game-grid'>
        {rows}
      </div>
    )
  }
}

export default GameGrid
