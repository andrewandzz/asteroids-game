import GameObject from "./engine/game-object";
import Event from "./engine/event";
import Vector from "./vector";

export default class Player extends GameObject {
  constructor(core) {
    super(core);

    this.onFire = new Event();
    this.width = 20;
    this.height = 50;
    this.acceleration = 0;
    this.inertia = new Vector();
    this.angularVelocity = 0;
    this.isFiring = false;

    this._maxInertia = 4;
    this._fadeFactor = 0.99;
    this._bottomOffset = 5;

    this._fireInterval = 200;
    this._lastFireTime = -this._fireInterval;

    this._init();
  }

  update() {
    super.update();

    const dt = this.core.dt / 1000;

    this.inertia.x += this.acceleration * Math.sin(Math.PI / 180 * this.angle) * dt;
    this.inertia.y += -this.acceleration * Math.cos(Math.PI / 180 * this.angle) * dt;
    
    if (this.inertia.magnitude > this._maxInertia) {
      this.inertia.normalize();
      this.inertia.multiplyScalar(this._maxInertia);
    }
    
    this.angle += this.angularVelocity * dt;
    this.x += this.inertia.x;
    this.y += this.inertia.y;

    this._checkOutOfWorld();

    if (this.isFiring === true && this.core.time - this._lastFireTime > this._fireInterval) {
      this._fire();
    }

    this.inertia.multiplyScalar(this._fadeFactor);
  }

  draw() {
    const ctx = this.core.ctx;

    ctx.save();

    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.translate(-this.width / 2, -this.height / 2);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(this.width / 2, this.height - this._bottomOffset);
    ctx.lineTo(0, this.height);
    ctx.closePath();
    ctx.stroke();

    if (this.acceleration > 0) {
      ctx.beginPath();
      ctx.moveTo(this.width / 2 - 2, this.height - this._bottomOffset);
      ctx.lineTo(this.width / 2, this.height);
      ctx.lineTo(this.width / 2 + 2, this.height - this._bottomOffset);
      ctx.closePath();
      ctx.stroke();
    }

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
    this._listenEvents();
  }

  _listenEvents() {
    window.addEventListener('keydown', (e) => this._onKeyDown(e));
    window.addEventListener('keyup', (e) => this._onKeyUp(e));
  }

  _onKeyDown(e) {
    if (this.visible === false) return;

    switch (e.keyCode) {
      case 38: this.acceleration = 400;
        break;
      case 37: this.angularVelocity = -200;
        break;
      case 39: this.angularVelocity = 200;
        break;
      case 32: this.isFiring = true;
        break;
    }
  }

  _onKeyUp(e) {
    if (this.visible === false) return;

    switch (e.keyCode) {
      case 38: this.acceleration = 0;
        break;
      case 37: this.angularVelocity = 0;
        break;
      case 39: this.angularVelocity = 0;
        break;
      case 32: this.isFiring = false;
        break;
    }
  }

  _fire() {
    this._lastFireTime = this.core.time;

    this.onFire.dispatch();
  }
}