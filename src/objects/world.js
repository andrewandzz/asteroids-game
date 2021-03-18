import GameObject from './engine/game-object';
import AsteroidsGroup from './asteroids-group/asteroids-group';
import Player from './player';
import Explosion from './explosion/explosion';
import BulletsGroup from './bullets-group/bullets-group';
import GameController from './game-controller';
import ScoreBoard from './score-board';
import HealthBoard from './health-board';
import Vector from './vector';
import ScreenText from './screen-text';

export default class World extends GameObject {
  constructor(core) {
    super(core);

    this._player = null;
    this._asteroidsGroup = null;
    this._explosion = null;
    this._scoreBoard = null;
    this._healthBoard = null;
    this._screenText = null;

    this._controller = null;

    this._init();
  }

  draw() {
    this._drawBg();
  }

  _drawBg() {
    const ctx = this.core.ctx;
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.core.width, this.core.height);
    ctx.closePath();
  }

  _init() {
    this._initPlayer();
    this._initAsteroids();
    this._initBullets();
    this._initExplosion();
    this._initScoreBoard();
    this._initHealthBoard();
    this._initScreenText();
    this._initGameController();
  }

  _initPlayer() {
    const player = this._player = new Player(this.core);
    player.x = this.core.width / 2;
    player.y = this.core.height / 2;
    player.startPosition = new Vector(player.x, player.y);
    player.name = 'player';

    this.addChild(this._player);

    this.core.physics.addCollider(player.collider);
  }

  _initAsteroids() {
    this._asteroidsGroup = new AsteroidsGroup(this.core);
    this.addChild(this._asteroidsGroup);
  }

  _initBullets() {
    this._bulletsGroup = new BulletsGroup(this.core, this._player);
    this.addChild(this._bulletsGroup);
  }

  _initExplosion() {
    this._explosion = new Explosion(this.core);
    this.addChild(this._explosion);
  }

  _initScoreBoard() {
    const scoreBoard = this._scoreBoard = new ScoreBoard(this.core);
    scoreBoard.x = 60;
    scoreBoard.y = 100;
    this.addChild(this._scoreBoard);
  }

  _initHealthBoard() {
    const healthBoard = this._healthBoard = new HealthBoard(this.core);
    healthBoard.x = 60;
    healthBoard.y = 180;
    this.addChild(this._healthBoard);
  }

  _initScreenText() {
    const screenText = this._screenText = new ScreenText(this.core);
    screenText.x = this.core.width / 2;
    screenText.y = this.core.height / 2 + 10;
    this.addChild(this._screenText);
  }

  _initGameController() {
    this._controller = new GameController(
      this._player,
      this._asteroidsGroup,
      this._bulletsGroup,
      this._explosion,
      this._scoreBoard,
      this._healthBoard,
      this._screenText
    );
  }
}