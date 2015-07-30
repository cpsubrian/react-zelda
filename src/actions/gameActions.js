import alt from '../alt'

const intervals = {}

class GameActions {

  startWalk (dir) {
    this.dispatch(dir)
  }

  stopWalk () {
    this.dispatch()
  }

  startAttack () {
    this.dispatch()
  }

  stopAttack () {
    this.dispatch()
  }

}

export default alt.createActions(GameActions)
