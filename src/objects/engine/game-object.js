import Collider from "./collider";

/**
 * @abstract
 */
export default class GameObject {
  constructor(core) {
    this.core = core;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.angle = 0;
    this.visible = true;
    
    this.collider = new Collider(this);
    
    this.children = [];
    
    this._name = 'game-object';
  }

  update() {
    if (this.visible === true) {
      this.draw();
    }

    this.core.physics.checkCollisions();

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update();
    }
  }

  addChild(obj) {
    this.children.push(obj);
  }

  draw() { }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this.collider.layer = value;
  }
}