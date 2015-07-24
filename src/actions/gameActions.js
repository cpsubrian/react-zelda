import alt from '../alt'

class GameActions {

  walk (dir) {
    this.dispatch(dir)
  }

  attack () {
    this.dispatch()
    setTimeout(() => {
      this.actions.stopAttack()
    }, 100)
  }

  stopAttack () {
    this.dispatch()
  }

}

export default alt.createActions(GameActions)
