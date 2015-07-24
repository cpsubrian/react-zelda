import _ from 'lodash'

const tiles = [
  {
    symbol: '-',
    type: 'grass',
    getDecorations () {
      if (this.decorations) {
        return this.decorations
      }
      let rand = Math.random()
      if (rand > 0.9) {
        this.decorations = [{type: 'flower', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.3 + (Math.random() * 0.4),
          transform: 'scale(' + (0.5 + (Math.random() * 0.5)) + ')'
        }}]
      } else if (rand > 0.85) {
        this.decorations = [{type: 'spot', style: {
          top: 3 + (5 * Math.random()),
          left: 2 + (5 * Math.random()),
          opacity: 0.5 + (Math.random() * 0.5)
        }}]
      } else {
        this.decorations = []
      }
      return this.decorations
    }
  },
  {
    symbol: 'l',
    type: 'leaves'
  },
  {
    symbol: 'b',
    type: 'bush',
    solid: true,
    destructable: true,
    destructTo: 'leaves'
  },
  {
    symbol: 'w',
    type: 'water',
    solid: true
  },
  {
    symbol: 't',
    type: 'tree-trunk',
    solid: true
  }
]

const tileFromType = (type) => {
  return _.extend({}, _.findWhere(tiles, {type}))
}

const tileFromSymbol = (symbol) => {
  return _.extend({}, _.findWhere(tiles, {symbol}))
}

export default tiles
export {tileFromType, tileFromSymbol}
