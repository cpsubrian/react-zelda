import alt from '../alt'
import _ from 'lodash'
import {throttle} from '../lib/decorators'
import world from '../lib/world'
import {tileFromType, tileFromSymbol} from '../lib/tiles'
import gameActions from '../actions/gameActions'

class GameStore {

  /* Static API
   ****************************************************************************/
  static getTile (grid, x, y) {
    if (grid[y] && grid[y][x]) {
      return grid[y][x]
    } else {
      return false
    }
  }

  /* Constructor
   ****************************************************************************/
  constructor () {
    // Bind actions.
    this.bindActions(gameActions)

    // Hero's state.
    this.hero = {
      position: {x: 0, y: 0},
      facing: 'south',
      pose: 'walk'
    }

    // Grid terrain
    this.grid = this.buildGrid(this.sanitizeWorld(world))
  }

  /* Actions
   ****************************************************************************/
  onWalk (dir) {
    let x = this.hero.position.x
    let y = this.hero.position.y

    if (dir === 'up') {
      if ((this.hero.facing === 'north') && this.validateMove(x, y - 1)) {
        this.hero.position.y--
      }
      this.hero.facing = 'north'
    }
    if (dir === 'down') {
      if ((this.hero.facing === 'south') && this.validateMove(x, y + 1)) {
        this.hero.position.y++
      }
      this.hero.facing = 'south'
    }
    if (dir === 'left') {
      if ((this.hero.facing === 'west') && this.validateMove(x - 1, y)) {
        this.hero.position.x--
      }
      this.hero.facing = 'west'
    }
    if (dir === 'right') {
      if ((this.hero.facing === 'east') && this.validateMove(x + 1, y)) {
        this.hero.position.x++
      }
      this.hero.facing = 'east'
    }
  }

  onAttack () {
    this.doAttack()
  }

  @throttle(100)
  doAttack () {
    this.hero.pose = 'attack'

    let x = this.hero.position.x
    let y = this.hero.position.y
    if (this.hero.facing === 'north') {
      y = y - 1
    }
    if (this.hero.facing === 'south') {
      y = y + 1
    }
    if (this.hero.facing === 'east') {
      x = x + 1
    }
    if (this.hero.facing === 'west') {
      x = x - 1
    }

    let tile = GameStore.getTile(this.grid, x, y)
    if (tile && tile.destructable) {
      this.grid[y][x] = tileFromType(tile.destructTo)
    }
  }

  onStopAttack () {
    this.hero.pose = 'walk'
  }

  /* API
   ****************************************************************************/
  sanitizeWorld (world) {
    return world.trim().split('\n').map((line) => {
      return line.trim().replace(/\s/g, '')
    }).join('\n')
  }

  buildGrid (world) {
    return world.split('\n').map((line) => {
      return line.split('').map((symbol) => {
        return _.extend({}, tileFromSymbol(symbol))
      })
    })
  }

  validateMove (x, y) {
    // Check grid extents.
    if (x < 0) return false
    if (y < 0) return false

    // Check tile.
    if (this.grid[y] && this.grid[y][x]) {
      let tile = this.grid[y][x]
      if (tile.solid) {
        return false
      }
    } else {
      return false
    }

    return true
  }

}

export default alt.createStore(GameStore)
