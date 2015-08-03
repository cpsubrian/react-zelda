import _ from 'lodash'

const tiles = [
  {
    symbol: '-',
    type: 'grass',
    sprite: 'overworld',
    path: ['tiles', 'grass'],
    decorations () {
      let rand = Math.random()
      if (rand > 0.95) {
        return [{type: 'flower', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.3 + (Math.random() * 0.4),
          transform: 'scale(' + (0.5 + (Math.random() * 0.5)) + ')'
        }}]
      } else if (rand > 0.9) {
        return [{type: 'spot', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.5 + (Math.random() * 0.5)
        }}]
      } else {
        return []
      }
    }
  },
  {
    symbol: 'l',
    type: 'leaves',
    sprite: 'overworld',
    path: ['tiles', 'leaves']
  },
  {
    symbol: 'b',
    type: 'bush',
    sprite: 'overworld',
    path: ['tiles', 'bush'],
    solid: true,
    destructable: true,
    destructTo: 'leaves'
  },
  {
    symbol: 'w',
    type: 'water',
    sprite: 'overworld',
    path: ['tiles', 'water'],
    solid: true,
    decorations () {
      let rand = Math.random()
      if (rand > 0.92) {
        return [{sprite: 'cliffsWater', type: 'bubbles0', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.5 + (Math.random() * 0.5)
        }}]
      } else if (rand > 0.87) {
        return [{sprite: 'cliffsWater', type: 'bubbles1', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.5 + (Math.random() * 0.5)
        }}]
      } else if (rand > 0.82) {
        return [{sprite: 'cliffsWater', type: 'bubbles2', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.5 + (Math.random() * 0.5)
        }}]
      } else if (rand > 0.7) {
        return [{sprite: 'cliffsWater', type: 'bubbles3', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.5 + (Math.random() * 0.5)
        }}]
      } else {
        return []
      }
    }
  },
  {
    symbol: 't',
    type: 'tree-trunk',
    sprite: 'overworld',
    path: ['tiles', 'tree-trunk'],
    solid: true
  },
  {
    symbol: 'T',
    type: 'tree',
    sprite: 'overworld',
    path: ['tiles', 'tree'],
    solid: true
  }
]

const tileFromSymbol = (symbol) => {
  return createTile(_.findWhere(tiles, {symbol}))
}

const tileFromType = (type) => {
  return createTile(_.findWhere(tiles, {type}))
}

const getDecorations = (tile) => {
  if (tile.decorations) {
    let decorations = (typeof tile.decorations === 'function') ? tile.decorations() : tile.decorations
    return decorations.map((decoration) => {
      return Object.assign({}, {
        sprite: tile.sprite,
        path: tile.path.concat(['decorations', decoration.type])
      }, decoration)
    })
  } else {
    return null
  }
}

const createTile = (base) => {
  let tile = _.omit(base, 'decorations')
  if (base.decorations) {
    tile.decorations = getDecorations(base)
  }
  return tile
}

export default tiles
export {tileFromSymbol, tileFromType}
