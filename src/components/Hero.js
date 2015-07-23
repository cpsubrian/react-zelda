import React from 'react'

class Hero extends React.Component {

  static propTypes = {
    facing: React.PropTypes.string
  }

  getStyles () {
    return Hero.sprite[this.props.facing].walk[0]
  }

  render () {
    return (
      <div className='hero'>
        <div className='sprite' style={this.getStyles()}/>
      </div>
    )
  }

  static sprite = {
    north: {
      walk: [
        { width: 18, height: 26, backgroundPosition: '-524px -130px'}
      ]
    },
    south: {
      walk: [
        { width: 18, height: 26, backgroundPosition: '-170px -126px'}
      ]
    },
    east: {
      walk: [
        { width: 18, height: 26, backgroundPosition: '-856px -126px'}
      ]
    },
    west: {
      walk: [
        { width: 18, height: 26, backgroundPosition: '-856px -126px', transform: 'rotateY(180deg)'}
      ]
    }
  }
}

export default Hero
