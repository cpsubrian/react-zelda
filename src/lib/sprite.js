const sprite = {

  getProps: (sprite, ...path) => {
    let props = {}

    if (sprite.base) {
      Object.assign(props, sprite.base)
    }

    if (path.length) {
      props = Object.assign(props, path.reduce((memo, key) => {
        if (memo.hasOwnProperty(key)) {
          if (memo[key].hasOwnProperty('base')) {
            Object.assign(props, memo[key].base)
          }
          return memo[key]
        }
        return {}
      }, sprite))
    }

    return props
  }

}

export default sprite
