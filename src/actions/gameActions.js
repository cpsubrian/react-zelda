import alt from '../alt'

class GameActions {

  walk (dir) {
    this.dispatch(dir)
  }

}

export default alt.createActions(GameActions)
