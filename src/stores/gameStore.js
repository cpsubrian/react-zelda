import alt from '../alt'
import gameActions from '../actions/gameActions'

class GameStore {

  /* Static API
   ****************************************************************************/
  static tileTypes = {
    '-': {type: 'grass'},
    'l': {type: 'leaves'},
    'b': {type: 'bush', solid: true},
    'w': {type: 'water', solid: true},
    't': {type: 'tree-trunk', solid: true}
  }

  static getTileType (grid, x, y) {
    let col = x * 2
    let row = y
    if (grid[row] && !!grid[row][col]) {
      return GameStore.tileTypes[grid[row][col]]
    }
    return false
  }

  /* Constructor
   ****************************************************************************/
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
      '- l - - - w w - - - - - - - b - l - - -',
      '- - - - - w w w - - - - - - - - - - - -',
      '- l - - - w - - - - - - l - - - - - - -',
      '- - - - - - - b - - - - - - - - - b - -',
      '- - - - - - - - - - - - - - - - - - - -',
      '- - - l - t t - - - - - - - - - - - - -',
      '- - - - - t t - - - l b b - - - - - - -',
      '- - - - - - - - - - - - - - - - - t t -',
      '- - b - - - - - - - - - - - - - - t t -',
      '- - - - - - - - l - - - - - - - - - - -',
      '- - - - l - - - - - - - - - b - - - - w',
      '- - w w - - - - - - - - - - - - - - w w',
      '- - w w - - - - - b - - - - - - w w w -',
      '- - - - - - - - - - - - - - - - w w - -'
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

    // Check tile.
    let tile = GameStore.getTileType(this.grid, x, y)
    if (!tile || tile.solid) return false

    return true
  }

}

export default alt.createStore(GameStore)
