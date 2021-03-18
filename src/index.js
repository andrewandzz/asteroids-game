import World from "./objects/world";
import Physics from "./objects/engine/physics";

class Main {
  constructor() {
    this.container = document.getElementById('content');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;
    this.time = 0;
    this.dt = 0;
    this.physics = new Physics();

    this._world = null;
    
    // save reference to update method along with context
    this._updateCallback = this.update.bind(this);

    this.init();
  }

  init() {
    window.addEventListener("resize", _ => this.onResize());
    this.onResize();

    requestAnimationFrame(this._updateCallback);

    this._world = new World(this);
  }

  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  update(currentTime) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.dt = currentTime - this.time;
    this.time = currentTime;

    this._world.update();

    requestAnimationFrame(this._updateCallback);
  }
}

new Main();