import Immutable from 'immutable'
import _ from 'lodash'
import {tileFromSymbol} from '../lib/tiles'
import spriteUtils from '../lib/sprite'
import sprites from '../sprites'

const world = {

  map: `

    - - - b - - - w w - - - - - - - b - b - - - - - - - - - w - - -
    - - - - - - - w w w - - - - - - - - - - - - - w w w - - w w - -
    - b - b - - - w - - - - - - b - - - - - - - - w w w w - - w w -
    - - - - - - - - - b - - - - - - - - - b - - - - w w - - - - w w
    - - - - - - - - - - - - - - - - - - - - - - - - - w - - - - - -
    - b - - - b - - - - - - - - - - - - - - - - - - - w - - - - - -
    - - - - - - - - t - - - b b b - - - - - - - - w w w - b b b - -
    - w - - - - - - - - - - - - - - - - - - - - - w - - - - - - - -
    - - - - b b - - - - b - - - w w - - - - t - w w - - - - - - - -
    - - - - - - - - - - - - w w - w - - - - - - w w - - - - - - - -
    - - - - - - - - - - w w - w - - - - - w w w - - - - - - - b - -
    - - w w - - - - - - - w w w - - - - w w w - - - - - t - - - - -
    - - w w - - - - - b - - - - - - w w w w - - - - - - - - - t - -
    - - - - - - - - - - - - - - - - w w w w w w - - - - - - - - - -
    - - - - b b - - - - - - - b - - - w w w - - - - - - - - - - - -
    - - - - b b - - - - - - - - - - - - - - - - - - - - - - - - - -

  `,

  getTiles (map) {
    return world.buildWorld(world.sanitizeWorld(map))
  },

  getDimensions (map) {
    let temp = world.sanitizeWorld(map)
    let rows = temp.split('\n')

    return {
      width: rows[0].split('').length * 16,
      height: rows.length * 16
    }
  },

  sanitizeWorld (map) {
    return map.trim().split('\n').map((line) => {
      return line.trim().replace(/\s/g, '')
    }).join('\n')
  },

  buildWorld (map) {
    let grid = []
    return Immutable.List().withMutations((tiles) => {
      map.split('\n').forEach((line, row) => {
        grid[row] = []
        line.split('').forEach((symbol, col) => {
          let tile = Object.assign({}, tileFromSymbol(symbol), {
            row: row,
            col: col,
            position: {
              x: col * 16,
              y: row * 16
            }
          })
          grid[row][col] = tile.type
          tiles.push(Immutable.fromJS(tile))
        })
      })
    }).map((tile) => {
      let edges = world.buildEdges(grid, tile)
      if (edges) {
        return tile.set('edges', Immutable.fromJS(edges))
      }
      return tile
    })
  },

  buildEdges (grid, tile) {
    let sprite = sprites[tile.get('sprite')]
    let types = spriteUtils.getIn.apply(null, [sprite, ...tile.get('path'), 'edges'])
    if (types) {
      let edges = {}
      _.without(Object.keys(types), '_base', '_animation').forEach((type) => {
        let sides = world.getEdgesForType(grid, tile, type)
        if (sides.length) {
          edges[type] = sides
        }
      })
      return _.isEmpty(edges) ? null : edges
    }
  },

  getEdgesForType (grid, tile, type) {
    let x = tile.get('col')
    let y = tile.get('row')
    let sides = [
      {name: 's', x, y: y + 1},
      {name: 'n', x, y: y - 1},
      {name: 'w', x: x - 1, y},
      {name: 'e', x: x + 1, y},
      {name: 'nw', x: x - 1, y: y - 1},
      {name: 'ne', x: x + 1, y: y - 1},
      {name: 'sw', x: x - 1, y: y + 1},
      {name: 'se', x: x + 1, y: y + 1}
    ]
    let orth = sides
      .filter((side) => {
        return side.x >= 0 && side.y >= 0 && grid[side.y]
      })
      .filter((side) => {
        let check = grid[side.y][side.x]
        return !!check && (check === type)
      })
      .map((side) => {
        return side.name
      })
    let checkDiag = ['nw', 'ne', 'sw', 'se']
    checkDiag.forEach((side) => {
      let diag = side.split('')
      if (_.includes(orth, diag[0]) || _.includes(orth, diag[1])) {
        orth = _.without(orth, side)
      }
    })
    let corners = ['naw', 'nae', 'saw', 'sae']
    let results = orth.concat(corners
      .filter((corner) => {
        let sides = corner.split('a')
        return _.includes(orth, sides[0]) && _.includes(orth, sides[1])
      })
    )
    return results
  }
}

export default world
