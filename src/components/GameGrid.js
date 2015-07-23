import React from 'react'
import _ from 'lodash'
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
        {row.split(' ').map((char, i) => {
          return this.renderCell(i, rowNum)
        })}
      </div>
    )
  }

  renderCell (x, y) {
    let tile = gameStore.getTileType(this.props.grid, x, y)
    return (
      <div key={'cell-' + x} className='game-grid-cell'>
        <div className={'game-grid-base game-grid-base--' + tile.type}/>
        {this.renderOverlays(tile, x, y)}
        {(this.props.hero.position.x === x && this.props.hero.position.y === y) ?
          <Hero {...this.props.hero}/>
        : null}
      </div>
    )
  }

  renderOverlays (tile, x, y) {
    if (tile.type === 'grass') {
      let sides = this.getSides(x, y, 'water')
      return sides.map((side) => {
        return <div key={'side-' + side} className={'game-grid-overlay game-grid-overlay--water-' + side}/>
      })
    }
    return null
  }

  getSides (x, y, type) {
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
        let tile = gameStore.getTileType(this.props.grid, side.x, side.y)
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
