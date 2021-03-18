import GameObject from "../engine/game-object";
import Vector from "../vector";

export default class Asteroid extends GameObject {
  constructor(core, width, height) {
    super(core);

    this.width = width;
    this.height = height;

    this._points = null;
    this._velocity = new Vector();

    this._init();
  }

  update() {
    super.update();

    const dt = this.core.dt / 1000;

    this.x += this._velocity.x * dt;
    this.y += this._velocity.y * dt;

    this._checkOutOfWorld();
  }

  draw() {
    const ctx = this.core.ctx;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(this._points[0], this._points[1]);

    for (let i = 2; i < this._points.length; i += 2) {
      ctx.lineTo(this._points[i], this._points[i + 1]);
    }

    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  _checkOutOfWorld() {
    if (this.x < 0) {
      this.x = this.core.width;
    }

    if (this.x > this.core.width) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = this.core.height;
    }

    if (this.y > this.core.height) {
      this.y = 0;
    }
  }

  _init() {
    this._points = this._generatePoints();
    this._velocity.x = rnd(-200, 200);
    this._velocity.y = rnd(-200, 200);
  }

  _generatePoints() {
    const w = this.width;
    const h = this.height;

    const points = [
      // top
      rnd(0, w * 0.2), rnd(0, h * 0.2),
      rnd(w * 0.2, w * 0.4), rnd(0, h * 0.2),
      rnd(w * 0.4, w * 0.6), rnd(0, h * 0.3),
      rnd(w * 0.6, w * 0.8), rnd(0, h * 0.2),
      rnd(w * 0.8, w), rnd(0, h * 0.2),

      // right
      rnd(w * 0.8, w), rnd(h * 0.2, h * 0.4),
      rnd(w * 0.7, w), rnd(h * 0.4, h * 0.7),
      rnd(w * 0.8, w), rnd(h * 0.7, h),

      // bottom
      rnd(w * 0.7, w * 0.8), rnd(h * 0.9, h),
      rnd(w * 0.5, w * 0.7), rnd(h * 0.8, h),
      rnd(w * 0.3, w * 0.5), rnd(h * 0.7, h),
      rnd(w * 0.1, w * 0.3), rnd(h * 0.8, h),

      // left
      rnd(0, w * 0.2), rnd(h * 0.5, h * 0.8),
      rnd(w * 0.05, w * 0.1), rnd(h * 0.4, h * 0.5),
      rnd(0, w * 0.3), rnd(h * 0.2, h * 0.4),
      rnd(w * 0.1, w * 0.2), rnd(h * 0.1, h * 0.2)
    ];

    return points;
  }
}

function rnd(from, to) {
  return Math.floor(from + Math.random() * (to - from));
}