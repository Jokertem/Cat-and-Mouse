import { Directions } from "./directions.js";
import { tileSize } from "./tilemap.js";
import { isColision } from "./utils.js";

const rat = new Image();
rat.src = "assets/Rats.png";
export class Player {
  x: number;
  y: number;
  speed: number;
  prevX: number;
  prevY: number;
  cheese: number;
  size: number;
  cheeses: number;
  direction: Directions;
  currentFrame: number;
  frameLimiter: number;
  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.prevX = x;
    this.prevY = y;
    this.cheese = 0;
    this.size = 24;
    this.cheeses = 0;
    this.direction = Directions.RIGHT;
    this.currentFrame = 0;
    this.frameLimiter = 0;
  }
  draw(ctx: CanvasRenderingContext2D, game: any) {
    this.frameLimiter++;
    if (this.frameLimiter >= game.animationSpeed) {
      this.frameLimiter = 0;
    }
    const cycleFrames1 = [450, 494, 538];
    const cycleFrames2 = [433, 481, 529];
    const cycleFrames3 = [432, 480, 528];
    const cycleFrames4 = [439, 495, 537];
    switch (this.direction) {
      case Directions.DOWN:
        ctx.drawImage(
          rat,
          cycleFrames1[this.currentFrame],
          23,
          28,
          24,
          this.x,
          this.y,
          this.size,
          this.size
        );
        break;
      case Directions.LEFT:
        ctx.drawImage(
          rat,
          cycleFrames2[this.currentFrame],
          75,
          47,
          18,
          this.x,
          this.y,
          this.size,
          this.size
        );
        break;
      case Directions.RIGHT:
        ctx.drawImage(
          rat,
          cycleFrames3[this.currentFrame],
          123,
          47,
          18,
          this.x,
          this.y,
          this.size,
          this.size
        );
        break;
      case Directions.UP:
        ctx.drawImage(
          rat,
          cycleFrames4[this.currentFrame],
          165,
          28,
          23,
          this.x,
          this.y,
          this.size,
          this.size
        );
        break;

      default:
        break;
    }
    if (this.frameLimiter >= 14) this.currentFrame++;

    if (this.currentFrame >= cycleFrames1.length) {
      this.currentFrame = 0;
    }
  }
  update(game: any) {
    //Colosions with canvas border
    if (this.y <= 0) this.y = 0;
    if (this.y + this.size >= game.canvasSize.height)
      this.y = game.canvasSize.height - this.size;

    if (this.x <= 0) this.x = 0;
    if (this.x + this.size >= game.canvasSize.width)
      this.x = game.canvasSize.width - this.size;

    //Colosions with walls
    game.map.forEach((row: number[], i: number) => {
      row.forEach((col: number, j: number) => {
        const tileX = j * tileSize;
        const tileY = i * tileSize;

        if (
          col == 1 &&
          isColision(this, { x: tileX, y: tileY, size: tileSize })
        ) {
          this.x = this.prevX;
          this.y = this.prevY;
        }
      });
    });

    //Movement
    this.prevX = this.x;
    this.prevY = this.y;
    if (game.keys.Up) {
      this.direction = Directions.UP;
      this.y -= this.speed;
    } else if (game.keys.Down) {
      this.direction = Directions.DOWN;
      this.y += this.speed;
    } else if (game.keys.Left) {
      this.direction = Directions.LEFT;
      this.x -= this.speed;
    } else if (game.keys.Righ) {
      this.direction = Directions.RIGHT;
      this.x += this.speed;
    }
  }
}
