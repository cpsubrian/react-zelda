import React from 'react'
import Sprite from './Sprite'

class AnimatedSprite extends React.Component {

  static propTypes = {
    frames: React.PropTypes.array.isRequired,
    className: React.PropTypes.string,
    play: React.PropTypes.bool,
    rest: React.PropTypes.number,
    start: React.PropTypes.number,
    fps: React.PropTypes.number,
    loop: React.PropTypes.bool,
    snake: React.PropTypes.bool
  }

  static defaultProps = {
    play: false,
    rest: 0,
    start: 0,
    fps: 12,
    loop: true,
    snake: true
  }

  state = {
    animating: false,
    frame: this.props.rest,
    asc: true
  }

  componentWillMount () {
    if (this.props.play) {
      this.startAnimating()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.play && !this.props.play && !this.state.animating) {
      this.startAnimating()
    } else if (!nextProps.play && this.props.play && this.state.animating) {
      this.stopAnimating()
    } else if (nextProps.rest !== this.props.rest) {
      this.setState({frame: nextProps.rest, asc: true})
    }
  }

  startAnimating () {
    if (!this.state.animating) {
      this.setState({frame: this.props.start, animating: true})
      this.interval = setInterval(() => {
        this.animationStep()
      }, (1000 / this.props.fps))
    }
  }

  animationStep () {
    if (this.state.frame === 0) {
      this.setState({asc: true})
    }
    if (this.state.frame < (this.props.frames.length - 1)) {
      this.setState({frame: this.state.asc ? this.state.frame + 1 : this.state.frame - 1})
    } else if (!this.props.loop) {
      this.stopAnimating()
    } else {
      if (this.props.snake) {
        this.setState({frame: this.state.frame - 1, asc: false})
      } else {
        this.setState({frame: 0})
      }
    }
  }

  stopAnimating () {
    if (this.state.animating) {
      this.setState({frame: this.props.rest, animating: false})
      clearInterval(this.interval)
    }
  }

  render () {
    return <Sprite className={this.props.className} {...this.props.frames[this.state.frame]}/>
  }
}

export default AnimatedSprite
