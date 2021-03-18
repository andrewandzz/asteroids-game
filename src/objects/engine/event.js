export default class Event {
  constructor() {
    this._listeners = [];
    this._contexts = [];
  }

  addListener(listener, context = null) {
    this._listeners.push(listener);
    this._contexts.push(context);
  }

  dispatch(...args) {
    for (let i = 0; i < this._listeners.length; i++) {
      const context = this._contexts[i];
      this._listeners[i].call(context, ...args);
    }
  }
}