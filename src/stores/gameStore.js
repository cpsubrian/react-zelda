import alt from '../alt'
import _ from 'lodash'
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
                position: {x: 0, y: 0, sx: 0, sy: 0},
                stepSize: 20,
                facing: 'south',
                pose: 'walk',
                animate: false,
                actions: Immutable.Set()
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
    this.setInHero('actions', this.getHero().get('actions').add('walk:' + dir))
    this.setInHero('animate', true)
    this.onWalk(dir)
  }

  onWalk (dir) {
    let hero = this.getHero().toJS()
    let changeDir = _.intersection(hero.actions, ['walk:up', 'walk:down', 'walk:left', 'walk:right']).length === 1
    let sx = hero.position.sx
    let sy = hero.position.sy
    let next = false

    if (dir === 'up') {
      sy -= hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'north')
    }
    if (dir === 'down') {
      sy += hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'south')
    }
    if (dir === 'left') {
      sx -= hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'west')
    }
    if (dir === 'right') {
      sx += hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'east')
    }

    if (sx < -50) {
      sx = 50
      next = true
    }
    if (sx > 50) {
      sx = -50
      next = true
    }
    if (sy < -50) {
      sy = 50
      next = true
    }
    if (sy > 50) {
      sy = -50
      next = true
    }

    if (this.validateMove(hero.position.x, hero.position.y, sx, sy, dir)) {
      if (next) {
        this.onWalkNextTile(dir)
      }
      this.setInHero(['position', 'sx'], sx)
      this.setInHero(['position', 'sy'], sy)
    }
  }

  onWalkNextTile (dir) {
    let hero = this.getHero().toJS()
    let x = hero.position.x
    let y = hero.position.y

    if (dir === 'up') {
      y--
    }
    if (dir === 'down') {
      y++
    }
    if (dir === 'left') {
      x--
    }
    if (dir === 'right') {
      x++
    }

    this.setInHero(['position', 'x'], x)
    this.setInHero(['position', 'y'], y)
  }

  onStopWalk (dir) {
    this.setInHero('actions', this.getHero().get('actions').delete('walk:' + dir))
    if (!this.getHero().get('actions').size) {
      this.setInHero('animate', false)
    }
  }

  onStartAttack () {
    this.doAttack()
    this.setInHero('actions', this.getHero().get('actions').add('attack'))
    this.setInHero('animate', true)
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
    this.setInHero('actions', this.getHero().get('actions').delete('attack'))
    if (!this.getHero().get('actions').size) {
      this.setInHero('animate', false)
    }
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

  validateMove (x, y, sx, sy, dir) {
    // Check adjacent tile if we beyond the edge.
    if (dir === 'up' && sy < 0) {
      y--
    }
    if (dir === 'down' && sy > 0) {
      y++
    }
    if (dir === 'left' && sx < 0) {
      x--
    }
    if (dir === 'right' && sx > 0) {
      x++
    }

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

// allow hot loading for development usage
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.dispose(() => {
      delete alt.stores['GameStore']
    })
  }
}
