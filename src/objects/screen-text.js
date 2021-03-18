import GameObject from "./engine/game-object";

export default class ScreenText extends GameObject {
  constructor(core) {
    super(core);

    this.visible = false;

    this._text = '123213';
  }

  show() {
    this.visible = true;
  }

  setText(value) {
    this._text = value;
  }

  draw() {
    const ctx = this.core.ctx;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.font = '130px Tahoma';
    ctx.textAlign = "center";
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this._text, 0, 0);

    ctx.restore();
  }
}