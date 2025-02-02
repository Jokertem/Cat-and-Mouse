import { tileSize } from "./tilemap.js";

export class Player {
  x: number;
  y: number;
  speed: number;
  prevX: number;
  prevY: number;
  cheese: number;
  size: number;
  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.prevX = x;
    this.prevY = y;
    this.cheese = 0;
    this.size = 28;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.size, this.size);
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
          this.x < tileX + tileSize &&
          this.x + this.size > tileX &&
          this.y < tileY + tileSize &&
          this.y + this.size > tileY
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
      this.y -= this.speed;
    } else if (game.keys.Down) {
      this.y += this.speed;
    } else if (game.keys.Left) {
      this.x -= this.speed;
    } else if (game.keys.Righ) {
      this.x += this.speed;
    }
  }
}
