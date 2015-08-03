import _ from 'lodash'

const spriteUtils = {

  getProps: (sprite, ...path) => {
    let props = {_animation: {}, style: {}}

    if (sprite._base) {
      Object.assign(props, sprite._base)
    }
    if (sprite._animation) {
      Object.assign(props._animation, sprite._animation)
    }

    if (path.length) {
      Object.assign(props, path.reduce((memo, key) => {
        if (memo.hasOwnProperty(key)) {
          if (memo[key].hasOwnProperty('_base')) {
            Object.assign(props, memo[key]._base)
          }
          if (memo[key].hasOwnProperty('_animation')) {
            Object.assign(props._animation, memo[key]._animation)
          }
          return _.omit(memo[key], '_animation')
        }
        return {}
      }, sprite))
    }

    return props
  },

  getIn: (sprite, ...path) => {
    return path.reduce((memo, key) => {
      if (memo.hasOwnProperty(key)) {
        return memo[key]
      }
      return {}
    }, sprite)
  },

  getFrames: (sprite, ...path) => {
    let baseProps = spriteUtils.getProps(sprite, ...path)
    let animationProps = baseProps._animation
    let frames = baseProps._frames

    return Object.assign({}, animationProps, {
      frames: frames.map((frame, i) => {
        return Object.assign({}, baseProps, frame)
      })
    })
  },

  generateFrames: (numFrames, axis, offset, baseProps) => {
    let frames = []
    for (let i = 0; i < numFrames; i++) {
      if (i === 0) {
        frames.push(_.cloneDeep(baseProps))
      } else {
        let frame = _.cloneDeep(frames[i - 1])
        if (axis === 'x') {
          frame.pos[0] += offset
        }
        if (axis === 'y') {
          frame.pos[1] += offset
        }
        frames.push(frame)
      }
    }
    return frames
  }

}

export default spriteUtils
