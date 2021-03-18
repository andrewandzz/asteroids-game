export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  normalize() {
    const m = this.magnitude;

    if (m !== 0) {
      this.x /= m;
      this.y /= m;
    }
  }

  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}