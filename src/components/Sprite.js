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
    size: React.PropTypes.array.isRequired,
    background: React.PropTypes.string,
    url: React.PropTypes.string,
    pos: React.PropTypes.array,
    off: React.PropTypes.array,
    transform: React.PropTypes.string
  }

  getStyle () {
    let style = Object.assign({}, {
      width: this.props.bounds ? this.props.bounds[0] : this.props.size[0],
      height: this.props.bounds ? this.props.bounds[1] : this.props.size[0]
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
      width: this.props.size[0],
      height: this.props.size[1],
      backgroundRepeat: 'no-repeat'
    }

    if (this.props.background) {
      style.background = this.props.background
    }
    if (this.props.url) {
      style.backgroundImage = `url(${this.props.url})`
      if (this.props.pos) {
        style.backgroundPosition = `-${this.props.pos[0]}px -${this.props.pos[1]}px`
      }
    }
    if (this.props.off) {
      if ((this.props.off[0] > 0) || ((1 / this.props.off[0]) === +Infinity)) {
        style.left = `${this.props.off[0]}px`
      } else {
        style.right = `${this.props.off[0]}px`
      }
      if ((this.props.off[1] > 0) || ((1 / this.props.off[1]) === +Infinity)) {
        style.top = `${this.props.off[1]}px`
      } else {
        style.bottom = `${this.props.off[1]}px`
      }
    }
    if (this.props.transform) {
      style.transform = this.props.transform
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
