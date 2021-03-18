import Event from "./event";

export default class Collider {
  constructor(parent) {
    this.parent = parent;
    this.layer = parent.name;
    this.active = true;
    this.onCollide = new Event();
  }

  getBoundingBox() {
    return {
      x: this.parent.x,
      y: this.parent.y,
      width: this.parent.width,
      height: this.parent.height
    }
  }
}