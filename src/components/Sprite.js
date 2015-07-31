import React from 'react'

class Sprite extends React.Component {

  static propTypes = {
    // Wrapper
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    bounds: React.PropTypes.array,
    flipH: React.PropTypes.bool,
    flipV: React.PropTypes.bool,

    // Sprite Img
    url: React.PropTypes.string.isRequired,
    size: React.PropTypes.array.isRequired,
    pos: React.PropTypes.array.isRequired,
    off: React.PropTypes.array
  }

  getStyle () {
    let style = Object.assign({}, {
      width: this.props.bounds ? this.props.bounds[0] : null,
      height: this.props.bounds ? this.props.bounds[1] : null
    }, this.props.style || {})
    if (this.props.flipH) {
      style.transform = (style.transform || '') + ' rotateY(180deg)'
    }
    if (this.props.flipV) {
      style.transform = (style.transform || '') + ' rotateX(180deg)'
    }
    return style
  }

  getImgStyle () {
    let style = {
      background: `url(${this.props.url}) -${this.props.pos[0]}px -${this.props.pos[1]}px no-repeat`,
      width: this.props.size[0],
      height: this.props.size[1]
    }
    if (this.props.off) {
      style.left = `${this.props.off[0]}px`
      style.top = `${this.props.off[1]}px`
    }
    return style
  }

  render () {
    return (
      <div className={'sprite ' + (this.props.className || '')} style={this.getStyle()}>
        <div className='sprite-img' style={this.getImgStyle()}/>
      </div>
    )
  }
}

export default Sprite
