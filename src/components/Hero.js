import React from 'react'
import heroSprite from '../sprites/hero'

class Hero extends React.Component {

  static propTypes = {
    facing: React.PropTypes.string,
    pose: React.PropTypes.string
  }

  getStyles () {
    return heroSprite[this.props.pose][this.props.facing][0]
  }

  render () {
    return (
      <div className='hero'>
        <div className='sprite' style={this.getStyles()}/>
      </div>
    )
  }
}

export default Hero
