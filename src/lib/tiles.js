import _ from 'lodash'

const tiles = [
  {symbol: '-', type: 'grass'},
  {symbol: 'l', type: 'leaves'},
  {symbol: 'b', type: 'bush', solid: true, destructable: true, destructTo: 'leaves'},
  {symbol: 'w', type: 'water', solid: true},
  {symbol: 't', type: 'tree-trunk', solid: true}
]

const tileFromType = (type) => {
  return _.findWhere(tiles, {type})
}

const tileFromSymbol = (symbol) => {
  return _.findWhere(tiles, {symbol})
}

export default tiles
export {tileFromType, tileFromSymbol}
