import alt from '../alt'
import Immutable from 'immutable'
import {throttle} from '../lib/decorators'
import world from '../lib/world'
import {tileFromType, tileFromSymbol} from '../lib/tiles'
import gameActions from '../actions/gameActions'

class GameStore {

  /* Static API
   ****************************************************************************/
  static getTile (grid, x, y) {
    return grid.getIn([y, x])
  }

  /* Constructor
   ****************************************************************************/
  constructor () {
    // Bind actions.
    this.bindActions(gameActions)

    // Measurements (Matched by CSS)
    this.settings = Immutable.fromJS({
      grid: {
        cell: {
          width: 16,
          height: 16
        }
      }
    })

    // Layers
    this.layers = Immutable.List([
      // Overlays
      Immutable.fromJS({
        type: 'overlays',
        overlays: [
          {
            type: 'character',
            character: {
              type: 'hero',
              props: {
                position: {x: 0, y: 0},
                facing: 'south',
                pose: 'walk'
              }
            }
          }
        ]
      }),
      // Base Grid
      Immutable.Map({
        type: 'grid',
        base: true,
        grid: this.buildGrid(this.sanitizeWorld(world))
      })
    ])
  }

  /* Actions
   ****************************************************************************/
  onStartWalk (dir) {
    this.doWalk(dir)
  }

  @throttle(100)
  doWalk (dir) {
    let hero = this.getHero().toJS()
    let x = hero.position.x
    let y = hero.position.y
    let facing

    if (dir === 'up') {
      if ((hero.facing === 'north') && this.validateMove(x, y - 1)) {
        y--
      }
      facing = 'north'
    }
    if (dir === 'down') {
      if ((hero.facing === 'south') && this.validateMove(x, y + 1)) {
        y++
      }
      facing = 'south'
    }
    if (dir === 'left') {
      if ((hero.facing === 'west') && this.validateMove(x - 1, y)) {
        x--
      }
      facing = 'west'
    }
    if (dir === 'right') {
      if ((hero.facing === 'east') && this.validateMove(x + 1, y)) {
        x++
      }
      facing = 'east'
    }

    this.setInHero(['position', 'x'], x)
    this.setInHero(['position', 'y'], y)
    this.setInHero(['facing'], facing)
  }

  onStopWalk () {
    // Something here later...
  }

  onStartAttack () {
    this.doAttack()
  }

  @throttle(100)
  doAttack () {
    let hero = this.getHero().toJS()
    let grid = this.layers.getIn([1, 'grid'])
    let x = hero.position.x
    let y = hero.position.y

    if (hero.facing === 'north') {
      y = y - 1
    }
    if (hero.facing === 'south') {
      y = y + 1
    }
    if (hero.facing === 'east') {
      x = x + 1
    }
    if (hero.facing === 'west') {
      x = x - 1
    }

    let tile = GameStore.getTile(grid, x, y)
    if (tile && tile.destructable) {
      this.setInLayer([1, 'grid', y, x], tileFromType(tile.destructTo))
    }

    this.setInHero('pose', 'attack')
  }

  onStopAttack () {
    this.setInHero('pose', 'walk')
  }

  /* API
   ****************************************************************************/
  sanitizeWorld (world) {
    return world.trim().split('\n').map((line) => {
      return line.trim().replace(/\s/g, '')
    }).join('\n')
  }

  buildGrid (world) {
    return Immutable.List(world.split('\n').map((line) => {
      return Immutable.List(line.split('').map((symbol) => {
        return tileFromSymbol(symbol)
      }))
    }))
  }

  getHero () {
    return this.layers.getIn([0, 'overlays', 0, 'character', 'props'])
  }

  setInLayer (prop, val) {
    prop = Array.isArray(prop) ? prop : [prop]
    this.layers = this.layers.setIn(prop, val)
  }

  setInHero (prop, val) {
    prop = Array.isArray(prop) ? prop : [prop]
    this.setInLayer([0, 'overlays', 0, 'character', 'props'].concat(prop), val)
  }

  validateMove (x, y) {
    // Check grid extents.
    if (x < 0) return false
    if (y < 0) return false

    // Check tile.
    let tile = GameStore.getTile(this.layers.getIn([1, 'grid']), x, y)
    if (!tile || tile.solid) {
      return false
    }

    return true
  }

}

export default alt.createStore(GameStore)
