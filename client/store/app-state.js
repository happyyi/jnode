/**
 * Created by admin on 2018/3/27.
 */
import {
  observable,
  computed,
  autorun,
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
}

const appState = new AppState();
setInterval(() => {
  appState.add()
}, 1000)

autorun(() => {
  console.log(appState.count)
})

export default appState;
