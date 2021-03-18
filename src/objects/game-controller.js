export default class GameController {
  constructor(player, asteroidsGroup, bulletsGroup, explosion, scoreBoard, healthBoard, screenText) {
    this._player = player;
    this._asteroidsGroup = asteroidsGroup;
    this._bulletsGroup = bulletsGroup;
    this._explosion = explosion;
    this._scoreBoard = scoreBoard;
    this._healthBoard = healthBoard;
    this._screenText = screenText;

    this._totalWaves = 3;
    this._currentWave = 1;
    this._score = 0;
    this._health = 3;

    this._init();
  }

  _init() {
    this._asteroidsGroup.spawnBigAsteroids(5);
    this._healthBoard.setHealth(this._health);

    this._initPlayerController();
    this._initAsteroidsController();
  }

  _initPlayerController() {
    this._player.collider.onCollide.addListener(() => {
      this._killPlayer();

      this._health -= 1;
      this._healthBoard.setHealth(this._health);

      if (this._health > 0) {
        setTimeout(() => {
          this._spawnPlayer();
        }, 2000);

      } else {
        setTimeout(() => {
          this._screenText.setText('GAME OVER');
          this._screenText.show();
        }, 1000);
      }

    });

    this._player.onFire.addListener(() => {
      this._bulletsGroup.fire();
    });
  }

  _killPlayer() {
    this._explosion.x = this._player.x + this._player.width / 2;
    this._explosion.y = this._player.y + this._player.height / 2;
    this._explosion.show();

    this._player.visible = false;
    this._player.collider.active = false;
    this._player.inertia.x = 0;
    this._player.inertia.y = 0;
    this._player.acceleration = 0;
    this._player.angularVelocity = 0;
    this._player.isFiring = false;
  }

  _spawnPlayer() {
    this._player.visible = true;
    this._player.x = this._player.startPosition.x;
    this._player.y = this._player.startPosition.y;
    this._player.angle = 0;
    this._player.collider.active = true;
  }

  _initAsteroidsController() {
    this._asteroidsGroup.onBulletHits.addListener((asteroid, bullet) => {
      this._killAsteroid(asteroid);
      this._bulletsGroup.kill(bullet);

      if (asteroid.type === 'big') {
        const pos = { x: asteroid.x, y: asteroid.y };
        this._asteroidsGroup.spawnSmallAsteroids(pos);

        this._score += 100;
      } else if (asteroid.type === 'small') {
        this._score += 50;
      }

      this._scoreBoard.setText(this._score);

      this._checkForNoAsteroids();
    });
  }

  _killAsteroid(asteroid) {
    this._explosion.x = asteroid.x + asteroid.width / 2;
    this._explosion.y = asteroid.y + asteroid.height / 2;
    this._explosion.show();

    this._asteroidsGroup.kill(asteroid);
  }

  _checkForNoAsteroids() {
    if (this._asteroidsGroup.aliveCount === 0) {
      if (this._currentWave < this._totalWaves) {
        this._currentWave += 1;

        const asteroidsCount = this._currentWave * 4;
        this._asteroidsGroup.spawnBigAsteroids(asteroidsCount);
      } else {
        this._screenText.setText('VICTORY');
        this._screenText.show();
      }
    }
  }
}