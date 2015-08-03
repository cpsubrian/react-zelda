import React from 'react'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'
import spriteUtils from '../lib/sprite'
import sprites from '../sprites'
import Sprite from './Sprite'
import AnimatedSprite from './AnimatedSprite'

@pureRender
class Character extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    sprite: React.PropTypes.string.isRequired,
    facing: React.PropTypes.string.isRequired,
    pose: React.PropTypes.string.isRequired,
    position: ImmutablePropTypes.map,
    animated: React.PropTypes.bool,
    play: React.PropTypes.bool,
    style: ImmutablePropTypes.map
  }

  render () {
    let sprite = sprites[this.props.sprite]
    let style = this.props.style ? this.props.style.toJS() : {}

    if (this.props.position) {
      let {x, y} = this.props.position.toJS()
      style.transform = (style.transform || '') + ` translate(${x}px, ${y}px)`
    }

    if (this.props.animated) {
      let name = `${this.props.pose}:${this.props.facing}`
      let frames = spriteUtils.getFrames(sprite, 'poses', this.props.pose, this.props.facing)
      return (
        <div className={'character animated ' + (this.props.className || '')} style={style}>
          <AnimatedSprite name={name} play={this.props.play} {...frames}/>
        </div>
      )
    } else {
      let props = spriteUtils.getProps(sprite, 'poses', this.props.pose, this.props.facing)
      return (
        <div className={'character' + (this.props.className || '')} style={style}>
          <Sprite {...props}/>
        </div>
      )
    }
  }
}

export default Character
