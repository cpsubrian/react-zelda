import alt from '../alt'
import _ from 'lodash'
import Immutable from 'immutable'
import SAT from 'sat'
import QuadTree from '../lib/QuadTree'
import {throttle} from '../lib/decorators'
import {tileFromType} from '../lib/tiles'
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
            stepSize: 2,
            sprite: 'hero',
            facing: 'south',
            pose: 'walk',
            animated: true,
            play: false,
            actions: Immutable.Set(),
            hitboxes: {
              walk: [3, 3, 10, 10],
              attack: {
                north: [0, -16, 16, 16],
                south: [0, 32, 16, 16],
                east: [16, 0, 16, 16],
                west: [-16, 0, 16, 16]
              }
            }
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

    // QuadTrees for collision detection.
    this.quadTrees = []
  }

  /* Actions
   ****************************************************************************/
  onRenderLayer (index) {
    let layer = this.layers.get(index)
    if (layer) {

      // Clear or create trees and hitboxes.
      if (this.quadTrees[index]) {
        this.quadTrees[index].clear()
      } else {
        let bounds = {x: 0, y: 0, width: this.width, height: this.height}
        this.quadTrees[index] = new QuadTree(bounds, 10, 5)
      }

      // Tiles
      if (layer.has('tiles')) {
        layer.get('tiles').forEach((tile, tIndex) => {
          if (!tile.get('solid')) return
          let {x, y} = tile.get('position').toJS()
          let [top, left, width, height] = tile.get('hitbox')
          let obj = {
            layer: index,
            group: 'tiles',
            index: tIndex,
            x: x + left,
            y: y + top,
            width: width,
            height: height
          }
          let hitbox = new SAT.Box(new SAT.Vector(obj.x, obj.y), obj.width, obj.height).toPolygon()
          obj.hitbox = hitbox
          this.quadTrees[index].insert(obj)
        })
      }

      // Add characters to tree.
      if (layer.has('characters')) {
        layer.get('characters').forEach((character, tIndex) => {
          let {x, y} = character.get('position').toJS()
          let [top, left, width, height] = character.getIn(['hitboxes', 'walk']).toJS()
          let obj = {
            layer: index,
            group: 'characters',
            index: tIndex,
            x: x + left,
            y: y + top,
            width: width,
            height: height
          }
          let hitbox = new SAT.Box(new SAT.Vector(obj.x, obj.y), obj.width, obj.height).toPolygon()
          obj.hitbox = hitbox
          this.quadTrees[index].insert(obj)
        })
      }
    }
  }

  onStartWalk (dir) {
    this.setInHero('actions', this.getHero().get('actions').add('walk:' + dir))
    this.setInHero('play', true)
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
      this.setInHero('play', false)
    }
  }

  onStartAttack () {
    this.doAttack()
    this.setInHero('actions', this.getHero().get('actions').add('attack'))
    this.setInHero('play', true)
  }

  @throttle(100)
  doAttack () {
    let hero = this.getHero()
    let facing = hero.get('facing')
    let {x, y} = hero.get('position').toJS()
    let [left, top, width, height] = hero.getIn(['hitboxes', 'attack', facing]).toJS()

    let hits = this.checkHitbox({
      x: x + left,
      y: y + top,
      width: width,
      height: height,
      property: 'destructable'
    })

    hits.forEach((hit) => {
      let tile = this.layers.getIn([hit.layer, 'tiles', hit.index]).toJS()
      let newTile = Immutable.fromJS(this.mergeTiles(tile, tileFromType(tile.destructTo)))
      this.setInLayer([hit.layer, 'tiles', hit.index], newTile)
    })

    this.setInHero('pose', 'attack')
  }

  onStopAttack () {
    this.setInHero('pose', 'walk')
    this.setInHero('actions', this.getHero().get('actions').delete('attack'))
    if (!this.getHero().get('actions').size) {
      this.setInHero('play', false)
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
    if (x > (this.width - 16)) return false
    if (y > (this.height - 16)) return false

    // Check hitboxes.
    let [left, top, w, h] = this.getHero().getIn(['hitboxes', 'walk']).toJS()
    let hits = this.checkHitbox({
      x: x + left,
      y: y + top,
      width: w,
      height: h,
      property: 'solid'
    }, true)
    if (hits.length) return false

    return true
  }

  checkHitbox ({x, y, width, height, property}, onlyOne, overlap = 1) {
    let hitbox = (new SAT.Box(new SAT.Vector(x, y), width, height)).toPolygon()
    let res = new SAT.Response()
    let hits = []

    this.layers.forEach((layer, index) => {
      if (this.quadTrees[index]) {
        let objects = this.quadTrees[index].retrieve({x, y, width, height})
        objects.forEach((obj) => {
          if (obj.group !== 'tiles') return
          if (onlyOne && hits.length) return false
          let hit = SAT.testPolygonPolygon(hitbox, obj.hitbox, res)
          if (hit) {
            let thing = this.layers.getIn([obj.layer, obj.group, obj.index])
            if (!thing.get(property)) return
            if (res.overlap > overlap) {
              hits.push(obj)
            }
            res.clear()
          }
        })
        if (onlyOne && hits.length) return false
      }
    })

    return hits
  }

  mergeTiles (tileA, tileB) {
    return _.extend(_.pick(tileA, 'col', 'row', 'position', 'edges'), tileB)
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
