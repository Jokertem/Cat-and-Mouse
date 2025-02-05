import { Player } from "./player.js";
import { tileSize, map } from "./tilemap.js";
import { isColision, setRandomPosition } from "./utils.js";
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
  static update = (game: any, ctx: CanvasRenderingContext2D) => {
    this.draw(ctx);
    if (cheeses.length < game.maxCheese) {
      const poss = setRandomPosition();
      if (poss === undefined) {
        return;
      }

      const newCheese = new Cheese(
        poss.x * tileSize + tileSize / 2 - cheeseSize / 2,
        poss.y * tileSize + tileSize / 2 - cheeseSize / 2,
        cheeseSize
      );
      cheeses.push(newCheese);
    }

    //Colisons with player
    cheeses.forEach((cheese, index) => {
      if (isColision(game.player, cheese)) {
        cheeses.splice(index, 1);
        game.player.cheeses++;
      }
    });
  };
}
