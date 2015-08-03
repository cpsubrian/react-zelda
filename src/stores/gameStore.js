import alt from '../alt'
import _ from 'lodash'
import Immutable from 'immutable'
import {throttle} from '../lib/decorators'
import world from '../lib/world'
import gameActions from '../actions/gameActions'

class GameStore {

  /* Constructor
   ****************************************************************************/
  constructor () {
    // Bind actions.
    this.bindActions(gameActions)

    // Dimensions
    let dimensions = world.getDimensions(world.map)
    this.width = dimensions.width
    this.height = dimensions.height

    // Layers
    this.layers = Immutable.List([
      // Hero
      Immutable.fromJS({
        characters: [
          {
            position: {x: 0, y: 0},
            stepSize: 4,
            sprite: 'hero',
            facing: 'south',
            pose: 'walk',
            animated: true,
            play: false,
            actions: Immutable.Set()
          }
        ],
        style: {
          zIndex: 1
        }
      }),
      // Base Grid
      Immutable.fromJS({
        tiles: world.getTiles(world.map),
        style: {
          zIndex: 0
        }
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
    let {x, y} = hero.position
    let changeDir = _.intersection(hero.actions, ['walk:up', 'walk:down', 'walk:left', 'walk:right']).length === 1

    if (dir === 'up') {
      y -= hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'north')
    }
    if (dir === 'down') {
      y += hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'south')
    }
    if (dir === 'left') {
      x -= hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'west')
    }
    if (dir === 'right') {
      x += hero.stepSize
      if (changeDir) this.setInHero(['facing'], 'east')
    }

    if (this.validateMove(x, y)) {
      this.setInHero(['position', 'x'], x)
      this.setInHero(['position', 'y'], y)
    }
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
    /*let hero = this.getHero().toJS()
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
    */
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
  getHero () {
    return this.layers.getIn([0, 'characters', 0])
  }

  setInLayer (prop, val) {
    prop = Array.isArray(prop) ? prop : [prop]
    this.layers = this.layers.setIn(prop, val)
  }

  setInHero (prop, val) {
    prop = Array.isArray(prop) ? prop : [prop]
    this.setInLayer([0, 'characters', 0, ...prop], val)
  }

  validateMove (x, y) {
    // Check grid extents.
    if (x < 0) return false
    if (y < 0) return false
    if (x > this.width) return false
    if (y > this.height) return false

    // Check tile.
    /*let tile = GameStore.getTile(this.layers.getIn([1, 'grid']), x, y)
    if (!tile || tile.solid) {
      return false
    }*/

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
