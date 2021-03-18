export default class Physics {
  constructor() {
    this._colliders = [];
  }

  addCollider(collider) {
    this._colliders.push(collider);
  }

  checkCollisions() {
    for (let i = 0; i < this._colliders.length; i++) {

      if (this._colliders[i].active === false) continue;

      for (let j = 0; j < this._colliders.length; j++) {

        if (this._colliders[j].active === false) continue;

        if (this._colliders[i] === this._colliders[j]) continue;

        const collider1 = this._colliders[i];
        const collider2 = this._colliders[j];

        if (this._properLayersCombination(collider1.layer, collider2.layer)) {

          if (this._intersect(collider1.getBoundingBox(), collider2.getBoundingBox())) {
            collider1.onCollide.dispatch(collider2);
            collider2.onCollide.dispatch(collider1);
          }

        }
      }
    }
  }

  _properLayersCombination(layer1, layer2) {
    return layer1 === 'player' && layer2 === 'asteroid' ||
      layer1 === 'bullet' && layer2 === 'asteroid';
  }

  _intersect(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
      return true;
    }

    return false;
  }
}