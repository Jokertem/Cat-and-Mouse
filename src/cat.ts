import { Directions } from "./directions.js";
import { Player } from "./player.js";
import { tileSize } from "./tilemap.js";

const cats: Cat[] = [];
const sprites: HTMLImageElement[] = [];

for (let index = 1; index < 48; index++) {
  const newImage = new Image();
  newImage.src = `assets/cats/catImage${index}.png`;
  sprites.push(newImage);
}

export class Cat {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  size: number;
  color: HTMLImageElement;
  speed: number;
  direction: Directions;
  currentFrame: number;
  frameLimiter: number;
  private constructor(
    x: number,
    y: number,
    size: number,
    color: HTMLImageElement,
    direction: Directions
  ) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.size = size;
    this.color = color;
    this.direction = direction;
    this.speed = 4;
    this.currentFrame = 0;
    this.frameLimiter = 0;
  }
  static draw = (ctx: CanvasRenderingContext2D, game: any) => {
    const cycleFramesX = [20 * 32, 21 * 32, 22 * 32, 23 * 32];

    cats.forEach((cat) => {
      cat.frameLimiter++;
      if (cat.frameLimiter >= game.animationSpeed) {
        cat.frameLimiter = 0;
      }
      if (cat.direction === Directions.DOWN) {
        ctx.drawImage(
          cat.color,
          cycleFramesX[cat.currentFrame],
          33,
          32,
          33,
          cat.x,
          cat.y,
          cat.size,
          cat.size
        );
      } else if (cat.direction === Directions.UP) {
        ctx.drawImage(
          cat.color,
          cycleFramesX[cat.currentFrame],
          32 * 9,
          32,
          32,
          cat.x,
          cat.y,
          cat.size,
          cat.size
        );
      } else if (cat.direction === Directions.LEFT) {
        ctx.drawImage(
          cat.color,
          cycleFramesX[cat.currentFrame],
          32 * 5,
          32,
          32,
          cat.x,
          cat.y,
          cat.size,
          cat.size
        );
      } else if (cat.direction === Directions.RIGHT) {
        ctx.drawImage(
          cat.color,
          cycleFramesX[cat.currentFrame],
          32 * 13,
          32,
          32,
          cat.x,
          cat.y,
          cat.size,
          cat.size
        );
      }

      if (cat.frameLimiter >= 14) {
        cat.currentFrame++;
      }
      if (cat.currentFrame >= cycleFramesX.length) {
        cat.currentFrame = 0;
      }
    });
  };

  static update = (game: any) => {
    if (cats.length < game.maxCats) {
      const randomColor = Math.floor(Math.random() * 47);
      const randomDirection = Math.floor(Math.random() * 4);
      const row = Math.floor(Math.random() * game.map.length);
      const col = Math.floor(Math.random() * game.map[0].length);
      const tile = game.map[row][col];
      if (tile === 1) {
        return;
      }
      const newCat = new Cat(
        col * tileSize,
        row * tileSize,
        44,
        sprites[randomColor],
        randomDirection
      );
      cats.push(newCat);
    }

    cats.forEach((cat) => {
      cat.prevX = cat.x;
      cat.prevY = cat.y;
      //movement
      switch (cat.direction) {
        case Directions.UP:
          cat.y -= cat.speed;
          break;
        case Directions.DOWN:
          cat.y += cat.speed;
          break;
        case Directions.LEFT:
          cat.x -= cat.speed;
          break;
        case Directions.RIGHT:
          cat.x += cat.speed;
          break;

        default:
          break;
      }
      //Colisons with border
      if (cat.y < 0) {
        cat.y = 0;
        cat.direction = setRandomDirection(cat) as any;
      }
      if (cat.y + cat.size > game.canvasSize.height) {
        cat.y = game.canvasSize.height - cat.size;
        cat.direction = setRandomDirection(cat) as any;
      }
      if (cat.x < 0) {
        cat.direction = setRandomDirection(cat) as any;
        cat.x = 0;
      }
      if (cat.x + cat.size > game.canvasSize.width) {
        cat.x = game.canvasSize.width - cat.size;
        cat.direction = setRandomDirection(cat) as any;
      }

      //Colosions with wall
      game.map.forEach((row: number[], i: number) => {
        row.forEach((col: number, j: number) => {
          const tileX = j * tileSize;
          const tileY = i * tileSize;

          if (
            col == 1 &&
            cat.x < tileX + tileSize &&
            cat.x + cat.size > tileX &&
            cat.y < tileY + tileSize &&
            cat.y + cat.size > tileY
          ) {
            cat.x = cat.prevX;
            cat.y = cat.prevY;
            cat.direction = setRandomDirection(cat);
          }
        });
      });
      //Colions with player
      if (
        cat.x < game.player.x + game.player.size &&
        cat.x + cat.size > game.player.x &&
        cat.y < game.player.y + game.player.size &&
        cat.y + cat.size > game.player.y
      ) {
        game.gameOver = true;
      }
    });
  };
}
const setRandomDirection = (cat: Cat) => {
  const randomDirection = Math.floor(Math.random() * 4);

  return randomDirection;
};
