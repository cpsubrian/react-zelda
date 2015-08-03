import alt from '../alt'

const actions = {}

class GameActions {

  renderLayer (index) {
    this.dispatch(index)
  }

  startWalk (dir) {
    this.dispatch(dir)
    actions[dir] = true
    window.requestAnimationFrame(() => {
      this.actions.walk(dir)
    })
  }

  walk (dir) {
    this.dispatch(dir)
    window.requestAnimationFrame(() => {
      if (!actions[dir]) return
      this.actions.walk(dir)
    })
  }

  stopWalk (dir) {
    actions[dir] = false
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
