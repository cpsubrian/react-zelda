import React from 'react'
import Hero from '../Hero'

class OverlaysLayer extends React.Component {

  static propTypes = {
    overlays: React.PropTypes.array,
    settings: React.PropTypes.object
  }

  getStyle (props) {
    let style = {}

    if (props.position) {
      let x = props.position.x * this.props.settings.grid.cell.width
      let y = props.position.y * this.props.settings.grid.cell.height
      style.transform = `translate(${x}px, ${y}px)`
    }

    return style
  }

  renderOverlay (overlay, num) {
    if (overlay.type === 'character') {
      if (overlay.character.type === 'hero') {
        return (
          <div className='character hero' style={this.getStyle(overlay.character.props)}>
            <Hero {...overlay.character.props}/>
          </div>
        )
      }
    }
    return null
  }

  render () {
    return (
      <div className='overlays'>
        {this.props.overlays.map((overlay, i) => {
          return (
            <div key={`overlay-${i}`} className='overlay'>
              {this.renderOverlay(overlay)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default OverlaysLayer
