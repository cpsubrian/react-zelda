import React from 'react'
import sprite from '../lib/sprite'
import hero from '../sprites/hero'
import Sprite from './Sprite'

class Hero extends React.Component {

  static propTypes = {
    facing: React.PropTypes.string,
    pose: React.PropTypes.string
  }

  render () {
    let props = sprite.getProps(hero, 'poses', this.props.pose, this.props.facing, 0)
    return (
      <Sprite className='hero' {...props}/>
    )
  }
}

export default Hero
