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
    let {width, height} = this.props.settings.toJS().grid.cell

    if (props.position) {
      let {x, y, sx, sy} = props.position
      let tx = (x * width) + (sx ? ((sx / 100) * width) : 0)
      let ty = (y * height) + (sy ? ((sy / 100) * height) : 0)
      style.transform = `translate(${tx}px, ${ty}px)`
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
