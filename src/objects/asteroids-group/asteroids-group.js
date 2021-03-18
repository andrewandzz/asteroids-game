import GameObject from '../engine/game-object';
import Asteroid from './asteroid';
import Event from '../engine/event';
import Pool from '../pool';

export default class AsteroidsGroup extends GameObject {
  constructor(canvas) {
    super(canvas);

    this.onBulletHits = new Event();

    this._bigPool = null;
    this._smallPool = null;
    this._activeAsteroids = [];

    this._init();
  }

  spawnBigAsteroids(count = 10) {
    for (let i = 0; i < count; i++) {
      this._bigPool.get();
    }
  }

  spawnSmallAsteroids(pos = { x: 0, y: 0 }) {
    const count = rnd(2, 4);

    for (let i = 0; i < count; i++) {
      const asteroid = this._smallPool.get();
      asteroid.x = pos.x;
      asteroid.y = pos.y;
    }
  }

  kill(asteroid) {
    if (asteroid.type === 'big') {
      this._bigPool.kill(asteroid);
    }

    if (asteroid.type === 'small') {
      this._smallPool.kill(asteroid);
    }
  }

  get aliveCount() {
    return this._activeAsteroids.length;
  }

  _init() {
    this._initBitPool();
    this._initSmallPool();
  }

  _initBitPool() {
    const creator = () => {
      const width = rnd(70, 130);
      const height = rnd(70, 130);

      const asteroid = new Asteroid(this.core, width, height);
      asteroid.x = 0;
      asteroid.y = 0;
      asteroid.name = 'asteroid';
      asteroid.type = 'big';

      this.addChild(asteroid);

      this.core.physics.addCollider(asteroid.collider);

      asteroid.collider.onCollide.addListener((targetCollider) => {
        if (targetCollider.layer === 'bullet') {
          this.onBulletHits.dispatch(asteroid, targetCollider.parent);
        }
      });

      return asteroid;
    };

    const killer = (asteroid) => {
      asteroid.visible = false;
      asteroid.collider.active = false;

      const index = this._activeAsteroids.indexOf(asteroid);

      if (index >= 0) {
        this._activeAsteroids.splice(index, 1);
      }
    };

    const resetter = (asteroid) => {
      asteroid.x = 0;
      asteroid.y = 0;
      asteroid.visible = true;
      asteroid.collider.active = true;

      this._activeAsteroids.push(asteroid);
    };

    this._bigPool = new Pool(creator, killer, resetter);
    this._bigPool.prefill(10);
  }

  _initSmallPool() {
    const creator = () => {
      const width = rnd(20, 40);
      const height = rnd(20, 40);

      const asteroid = new Asteroid(this.core, width, height);
      asteroid.x = 0;
      asteroid.y = 0;
      asteroid.name = 'asteroid';
      asteroid.type = 'small';

      this.addChild(asteroid);

      this.core.physics.addCollider(asteroid.collider);

      asteroid.collider.onCollide.addListener((targetCollider) => {
        if (targetCollider.layer === 'bullet') {
          this.onBulletHits.dispatch(asteroid, targetCollider.parent);
        }
      });

      return asteroid;
    };

    const killer = (asteroid) => {
      asteroid.visible = false;
      asteroid.collider.active = false;

      const index = this._activeAsteroids.indexOf(asteroid);

      if (index >= 0) {
        this._activeAsteroids.splice(index, 1);
      }
    };

    const resetter = (asteroid) => {
      asteroid.x = 0;
      asteroid.y = 0;
      asteroid.visible = true;
      asteroid.collider.active = true;

      this._activeAsteroids.push(asteroid);
    };

    this._smallPool = new Pool(creator, killer, resetter);
    this._smallPool.prefill(10);
  }
}

function rnd(from, to) {
  return Math.floor(from + Math.random() * (to - from));
}