import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import pureRender from 'pure-render-decorator'
import Hero from '../Hero'

@pureRender
class OverlaysLayer extends React.Component {

  static propTypes = {
    overlays: ImmutablePropTypes.list,
    settings: ImmutablePropTypes.map
  }

  getStyle (props) {
    let style = {}
    let settings = this.props.settings.toJS()

    if (props.position) {
      let x = props.position.x * settings.grid.cell.width
      let y = props.position.y * settings.grid.cell.height
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
              {this.renderOverlay(overlay.toJS())}
            </div>
          )
        })}
      </div>
    )
  }
}

export default OverlaysLayer
