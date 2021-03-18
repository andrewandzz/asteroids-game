import GameObject from "./engine/game-object";

export default class HealthBoard extends GameObject {
  constructor(core) {
    super(core);

    this._health = 3;
  }

  setHealth(value) {
    this._health = value;
  }

  draw() {
    const text = 'A'.repeat(this._health);

    const ctx = this.core.ctx;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.font = '60px Tahoma';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, 0, 0);

    ctx.restore();
  }
}