var _a;
import { tileSize } from "./tilemap.js";
import { isColision, setRandomPosition } from "./utils.js";
const cheeseImg = new Image();
const cheeseSize = 24;
cheeseImg.src = "assets/cheese/a.PNG";
const cheeses = [];
export class Cheese {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}
_a = Cheese;
Cheese.draw = (ctx) => {
    cheeses.forEach((cheese) => {
        ctx.drawImage(cheeseImg, cheese.x, cheese.y, cheese.size, cheese.size);
    });
};
Cheese.update = (game, ctx) => {
    _a.draw(ctx);
    if (cheeses.length < game.maxCheese) {
        const poss = setRandomPosition();
        if (poss === undefined) {
            return;
        }
        const newCheese = new _a(poss.x * tileSize + tileSize / 2 - cheeseSize / 2, poss.y * tileSize + tileSize / 2 - cheeseSize / 2, cheeseSize);
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
//# sourceMappingURL=cheese.js.map