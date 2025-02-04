import { Player } from "./player.js";
import { tileSize, map } from "./tilemap.js";
const cheeseImg = new Image();
const cheeseSize = 24;
cheeseImg.src = "assets/cheese/a.PNG";
const cheeses: Cheese[] = [];
export class Cheese {
  x: number;
  y: number;
  size: number;
  private constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  static draw = (ctx: CanvasRenderingContext2D) => {
    cheeses.forEach((cheese) => {
      ctx.drawImage(cheeseImg, cheese.x, cheese.y, cheese.size, cheese.size);
    });
  };
  static update = (game: any) => {
    if (cheeses.length < game.maxCheese) {
      const row = Math.floor(Math.random() * map.length);
      const col = Math.floor(Math.random() * map[0].length);
      const tile = map[row][col];
      if (tile === 1) {
        return;
      }

      const newCheese = new Cheese(
        col * tileSize + tileSize / 2 - cheeseSize / 2,
        row * tileSize + tileSize / 2 - cheeseSize / 2,
        cheeseSize
      );
      cheeses.push(newCheese);
    }

    //Colisons with player
    cheeses.forEach((cheese, index) => {
      if (
        game.player.x < cheese.x + cheese.size &&
        game.player.x + game.player.size > cheese.x &&
        game.player.y < cheese.y + cheese.size &&
        game.player.y + game.player.size > cheese.y
      ) {
        cheeses.splice(index, 1);
        game.player.cheeses++;
      }
    });
  };
}
