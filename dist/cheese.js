import { tileSize, map } from "./tilemap.js";
const maxCheese = 3;
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
Cheese.draw = (ctx) => {
    cheeses.forEach((cheese) => {
        ctx.drawImage(cheeseImg, cheese.x, cheese.y, cheese.size, cheese.size);
    });
};
Cheese.update = (player) => {
    if (cheeses.length < maxCheese) {
        const row = Math.floor(Math.random() * map.length);
        const col = Math.floor(Math.random() * map[0].length);
        const tile = map[row][col];
        if (tile === 1) {
            return;
        }
        const newCheese = new Cheese(col * tileSize + tileSize / 2 - cheeseSize / 2, row * tileSize + tileSize / 2 - cheeseSize / 2, cheeseSize);
        cheeses.push(newCheese);
    }
    //Colisons with player
    cheeses.forEach((cheese, index) => {
        if (player.x < cheese.x + cheese.size &&
            player.x + player.size > cheese.x &&
            player.y < cheese.y + cheese.size &&
            player.y + player.size > cheese.y) {
            cheeses.splice(index, 1);
            player.cheeses++;
        }
    });
};
//# sourceMappingURL=cheese.js.map