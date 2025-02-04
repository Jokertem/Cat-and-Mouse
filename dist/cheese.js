var _a;
import { tileSize, map } from "./tilemap.js";
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
        const row = Math.floor(Math.random() * map.length);
        const col = Math.floor(Math.random() * map[0].length);
        const tile = map[row][col];
        if (tile === 1) {
            return;
        }
        const newCheese = new _a(col * tileSize + tileSize / 2 - cheeseSize / 2, row * tileSize + tileSize / 2 - cheeseSize / 2, cheeseSize);
        cheeses.push(newCheese);
    }
    //Colisons with player
    cheeses.forEach((cheese, index) => {
        if (game.player.x < cheese.x + cheese.size &&
            game.player.x + game.player.size > cheese.x &&
            game.player.y < cheese.y + cheese.size &&
            game.player.y + game.player.size > cheese.y) {
            cheeses.splice(index, 1);
            game.player.cheeses++;
        }
    });
};
//# sourceMappingURL=cheese.js.map