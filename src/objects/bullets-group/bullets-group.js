import GameObject from "../engine/game-object";
import Bullet from "./bullet";
import Pool from "../pool";

export default class BulletsGroup extends GameObject {
  constructor(core, player) {
    super(core);

    this._player = player;
    this._pool = null;

    this._initPool();
  }

  fire() {
    this._pool.get();
  }

  kill(bullet) {
    this._pool.kill(bullet);
  }

  _initPool() {
    const creator = () => {
      const bullet = new Bullet(this.core);
      bullet.onOutOfWorld.addListener(this.kill, this);
      bullet.name = 'bullet';
      
      this.addChild(bullet);

      this.core.physics.addCollider(bullet.collider);

      return bullet;
    };

    const resetter = (bullet) => {
      const directionX = Math.sin(Math.PI / 180 * this._player.angle);
      const directionY = -Math.cos(Math.PI / 180 * this._player.angle);
      bullet.x = this._player.x + (this._player.height / 2) * directionX + this._player.width / 2;
      bullet.y = this._player.y + (this._player.height / 2) * directionY + this._player.height / 2;
      bullet.velocity = 800;
      bullet.direction.x = directionX;
      bullet.direction.y = directionY;
      bullet.visible = true;
      bullet.collider.active = true;
    };

    const killer = (bullet) => {
      bullet.velocity = 0;
      bullet.x = this._player.x;
      bullet.y = this._player.y;
      bullet.visible = false;
      bullet.collider.active = false;
    };

    this._pool = new Pool(creator, killer, resetter);
  }
}