import GameObject from "../engine/game-object";
import Vector from "../vector";

export default class ExplosionParticle extends GameObject {
  constructor(core) {
    super(core);

    this.velocity = new Vector();
    this.lifeDuration = 400; // in ms
    this.life = 0;
    this.sizeOverLife = [7, 1];
    this.size = this.sizeOverLife[0];
  }

  draw() {
    const ctx = this.core.ctx;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.min(2, Math.ceil(this.size / 2));
    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}