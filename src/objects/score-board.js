import GameObject from "./engine/game-object";

export default class ScoreBoard extends GameObject {
  constructor(core) {
    super(core);

    this._text = '0';
  }

  setText(value) {
    this._text = value;
  }
  
  draw() {
    const ctx = this.core.ctx;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.font = '60px Tahoma';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this._text, 0, 0);

    ctx.restore();
  }
}