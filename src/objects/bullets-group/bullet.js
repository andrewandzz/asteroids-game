import GameObject from "../engine/game-object";
import Vector from "../vector";
import Event from "../engine/event";

export default class Bullet extends GameObject {
  constructor(core) {
    super(core);

    this.width = 3;
    this.height = 3;

    this.onOutOfWorld = new Event();
    this.velocity = 800;
    this.direction = new Vector();
  }

  update() {
    super.update();

    const dt = this.core.dt / 1000;

    this.x += this.velocity * this.direction.x * dt;
    this.y += this.velocity * this.direction.y * dt;

    this._checkOutOfBounds();
  }

  draw() {
    const ctx = this.core.ctx;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }

  _checkOutOfBounds() {
    if (this.x < 0) {
      this.onOutOfWorld.dispatch(this);
    }

    if (this.x > this.core.width) {
      this.onOutOfWorld.dispatch(this);
    }

    if (this.y < 0) {
      this.onOutOfWorld.dispatch(this);
    }

    if (this.y > this.core.height) {
      this.onOutOfWorld.dispatch(this);
    }
  }
}