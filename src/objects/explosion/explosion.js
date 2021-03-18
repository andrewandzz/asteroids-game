import GameObject from "../engine/game-object";
import ExplosionParticle from "./explosion-particle";
import Pool from "../pool";

export default class Explosion extends GameObject {
  constructor(core) {
    super(core);

    this._particlePool = null;
    this._activeParticles = [];

    this._init();
  }

  update() {
    super.update();

    const dt = this.core.dt / 1000;

    for (let i = 0; i < this._activeParticles.length; i++) {
      const particle = this._activeParticles[i];

      particle.x += particle.velocity.x * dt;
      particle.y += particle.velocity.y * dt;
      particle.life += dt * 1000;

      const time = Math.min(1, particle.life / particle.lifeDuration);
      particle.size = this._lerp(particle.sizeOverLife[0], particle.sizeOverLife[1], time);

      if (particle.life > particle.lifeDuration) {
        this._particlePool.kill(particle);
      }
    }
  }

  show() {
    const count = rnd(10, 15);

    for (let i = 0; i < count; i++) {
      this._particlePool.get();
    }
  }

  _init() {
    this._initPool();
  }

  _initPool() {
    const creator = () => {
      const particle = new ExplosionParticle(this.core);
      this.addChild(particle);
      return particle;
    };

    const killer = (particle) => {
      const index = this._activeParticles.indexOf(particle);

      if (index >= 0) {
        this._activeParticles.splice(index, 1);
      }
      
      particle.visible = false;
    };

    const resetter = (particle) => {
      particle.x = this.x;
      particle.y = this.y;
      particle.velocity.x = rnd(-200, 200);
      particle.velocity.y = rnd(-200, 200);
      particle.life = 0;
      particle.visible = true;

      this._activeParticles.push(particle);
    };

    this._particlePool = new Pool(creator, killer, resetter);
    this._particlePool.prefill(10);
  }

  _lerp(from, to, time) {
    return from * (1 - time) + to * time;
  }
}

function rnd(from, to) {
  return Math.floor(from + Math.random() * (to - from));
}