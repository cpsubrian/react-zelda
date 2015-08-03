import spriteUtils from '../lib/sprite'

const hero = {
  _base: {
    bounds: [16, 16],
    size: [50, 50],
    url: 'images/sprites/link.png'
  },
  poses: {
    _base: {
      transform: `translate(0, -10px)`
    },
    walk: {
      _animation: {
        rest: 3,
        start: 3
      },
      north: {
        _frames: spriteUtils.generateFrames(7, 'x', 50, {pos: [50, 100]})
      },
      south: {
        _frames: spriteUtils.generateFrames(7, 'x', 50, {pos: [50, 50]})
      },
      east: {
        _frames: spriteUtils.generateFrames(7, 'x', 50, {pos: [50, 150], transform: `translate(-2px, -10px)`})
      },
      west: {
        _frames: spriteUtils.generateFrames(7, 'x', 50, {pos: [50, 150], transform: `translate(-1px, -10px)`, flipH: true})
      }
    },
    attack: {
      _animation: {
        rest: 0,
        start: 0
      },
      north: {
        _frames: [{pos: [100, 550], off: [-13, -23]}]
      },
      south: {
        _frames: [{pos: [50, 450], off: [-4, -5]}]
      },
      east: {
        _frames: [{pos: [150, 550]}]
      },
      west: {
        _frames: [{pos: [150, 550], flipH: true}]
      }
    }
  }
}

export default hero
