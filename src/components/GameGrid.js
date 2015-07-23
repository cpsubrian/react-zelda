import React from 'react'
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
      let sides = this.testSides(x, y, 'water')
      return sides.map((side) => {
        return <div key={'side-' + side} className={'game-grid-overlay game-grid-overlay--water-' + side}/>
      })
    }
    return null
  }

  testSides (x, y, type) {
    let sides = [
      {name: 'below', x, y: y + 1},
      {name: 'above', x, y: y - 1},
      {name: 'left', x: x - 1, y},
      {name: 'right', x: x + 1, y}
    ]
    return sides
      .filter((side) => {
        let tile = gameStore.getTileType(this.props.grid, side.x, side.y)
        return !!tile && (tile.type === type)
      })
      .map((side) => {
        return side.name
      })
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
