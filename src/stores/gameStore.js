import alt from '../alt'
import gameActions from '../actions/gameActions'

class GameStore {

  static tileTypes = {
    '-': {name: 'grass'},
    'a': {name: 'grass-alt'},
    'b': {name: 'bush', solid: true}
  }

  constructor () {
    // Bind actions.
    this.bindActions(gameActions)

    // Hero's state.
    this.hero = {
      position: {x: 0, y: 0},
      facing: 'south'
    }

    // Grid terrain
    this.grid = [
      '- - - - - - - - - - - - - - - - - - - -',
      '- a - - - - - - - - - - - - b - a - - -',
      '- - - - - - - - - - - - - - - - - - - -',
      '- a - - - - - - - - - - a - - - - - - -',
      '- - - - - - - - - - - - - - - - - b - -',
      '- - - - - - - - - - - - - - - - - - - -',
      '- - - a - - - - - - - - - - - - - - - -',
      '- - - - - - - - - - a b b - - - - - - -',
      '- - - - - - - - - - - - - - - - - - - -',
      '- - b - - - - - - - - - - - - - - - - -',
      '- - - - - - - - a - - - - - - - - - - -',
      '- - - - a - - - - - - - - - b - - - - -',
      '- - - - - - - - - - - - - - - - - - - -',
      '- - - - - - - - - b - - - - - - - - - -',
      '- - - - - - - - - - - - - - - - - - - -'
    ]
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

  /* API
   ****************************************************************************/
  gridSize () {
    return {
      width: this.grid[0].split(' ').length,
      height: this.grid.length
    }
  }

  validateMove (x, y) {
    // Check grid extents.
    if (x < 0) return false
    if (y < 0) return false
    if (x > (this.gridSize().width - 1)) return false
    if (y > (this.gridSize().height - 1)) return false

    // Check tile.
    let tile = this.getTileType(x, y)
    if (tile.solid) return false

    return true
  }

  getTileType (x, y) {
    let col = x * 2
    let row = y
    return GameStore.tileTypes[this.grid[row][col]]
  }

}

export default alt.createStore(GameStore)
