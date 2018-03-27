/**
 * Created by admin on 2018/3/27.
 */
import {
  observable,
  computed,
  action,
} from 'mobx'

export class AppState {
  @observable count = 1
  @observable name = 'jiangnan'

  @computed get msg() {
    return `${this.name} says ${this.count}`
  }

  @action add() {
    this.count += 1
  }
  @action changeName(name) {
    this.name = name
  }
}

const appState = new AppState();
setInterval(() => {
  appState.add()
}, 1000)

export default appState;
