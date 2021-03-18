export default class Pool {
  constructor(objCreator, objKiller, objResetter = null) {    
    this._objCreator = objCreator;
    this._objKiller = objKiller;
    this._objResetter = objResetter;

    this._items = [];
  }

  get() {
    let item = this._items.pop();

    if (item) {
      this._objResetter && this._objResetter(item);
      return item;
    }

    item = this._objCreator();
    this._objResetter && this._objResetter(item);
    return item;
  }

  kill(item) {
    this._items.push(item);
    this._objKiller(item);
  }

  prefill(count = 10) {
    for (let i = 0; i < count; i++) {
      const particle = this._objCreator();
      this.kill(particle);
    }
  }
}