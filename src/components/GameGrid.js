import React from 'react'
import Hero from './Hero'

class GameGrid extends React.Component {

  static propTypes = {
    grid: React.PropTypes.array,
    hero: React.PropTypes.object
  }

  renderRow (row, rowNum) {
    return (
      <div key={'row-' + rowNum} className='game-grid-row'>
        {row.split(' ').map((char, i) => {
          return this.renderCell(char, i, rowNum)
        })}
      </div>
    )
  }

  renderCell (char, x, y) {
    return (
      <div key={'cell-' + x} className={'game-grid-cell game-grid-cell--' + char}>
        {(this.props.hero.position.x === x && this.props.hero.position.y === y) ?
          <Hero {...this.props.hero}/>
        : null}
      </div>
    )
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
