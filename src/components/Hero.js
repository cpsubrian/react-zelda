import React from 'react'
import spriteUtils from '../lib/sprite'
import hero from '../sprites/hero'
import AnimatedSprite from './AnimatedSprite'

class Hero extends React.Component {

  static propTypes = {
    facing: React.PropTypes.string,
    pose: React.PropTypes.string,
    animate: React.PropTypes.bool
  }

  render () {
    let frames = spriteUtils.getFrames(hero, 'poses', this.props.pose, this.props.facing)
    return (
      <AnimatedSprite className='hero' play={this.props.animate} {...frames}/>
    )
  }
}

export default Hero
