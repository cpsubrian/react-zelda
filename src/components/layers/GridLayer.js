import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import pureRender from 'pure-render-decorator'
import GridLayerRow from './GridLayerRow'

@pureRender
class GridLayer extends React.Component {

  static propTypes = {
    grid: ImmutablePropTypes.list
  }

  render () {
    return (
      <div className='grid'>
        {this.props.grid.map((row, i) => {
          return <GridLayerRow key={'row-' + i} grid={this.props.grid} row={row} num={i}/>
        })}
      </div>
    )
  }
}

export default GridLayer
