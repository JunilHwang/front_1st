import { 발행기관 } from './observer-deep.js';

export class Store {

  #state;
  #mutations;
  #actions;

  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = 발행기관(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // state를 직접적으로 수정하지 못하도록 다음과 같이 정의한다.
    Object.keys(state).forEach(key => {
      Object.defineProperty(
        this.state,
        key,
        { get: () => this.#state[key] },
      )
    })
  }

  commit(action, payload) {
    this.#mutations[action](this.#state, payload);
  }

}
