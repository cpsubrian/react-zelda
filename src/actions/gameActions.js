import alt from '../alt'

const intervals = {}

class GameActions {

  startWalk (dir) {
    this.dispatch(dir)
    intervals[dir] = setInterval(() => {
      this.actions.walk(dir)
    }, (1000 / 30))
  }

  walk (dir) {
    this.dispatch(dir)
  }

  stopWalk (dir) {
    clearInterval(intervals[dir])
    this.dispatch(dir)
  }

  startAttack () {
    this.dispatch()
  }

  stopAttack () {
    this.dispatch()
  }

}

export default alt.createActions(GameActions)
