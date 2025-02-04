import { tileSize, map } from "./tilemap.js";
const Traps = [];
const trapSize = 32;
const trapImgage = new Image();
trapImgage.src = "assets/Trap.png";
export class Trap {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.trapTime = 2;
        this.timer = 0;
        this.trap = false;
        this.currentFrame = 0;
    }
    static draw(cxt, game) {
        const cycleFrames = [0, 35, 35 * 2, 35 * 3];
        Traps.forEach((trap) => {
            cxt.drawImage(trapImgage, cycleFrames[trap.currentFrame], 0, 32, 32, trap.x, trap.y, trap.size, trap.size);
            if (trap.trap) {
                trap.currentFrame++;
            }
            if (trap.currentFrame >= cycleFrames.length) {
                trap.currentFrame = 3;
            }
        });
    }
    static update(ctx, game) {
        this.draw(ctx, game);
        if (Traps.length < game.maxTrap) {
            const row = Math.floor(Math.random() * map.length);
            const col = Math.floor(Math.random() * map[0].length);
            const tile = map[row][col];
            if (tile === 1) {
                return;
            }
            const newTrap = new Trap(col * tileSize + tileSize / 2 - trapSize / 2, row * tileSize + tileSize / 2 - trapSize / 2, trapSize);
            Traps.push(newTrap);
        }
        //Colosions with player
        Traps.forEach((trap, index) => {
            if (trap.trap) {
                trap.timer++;
            }
            if (game.player.x < trap.x + trap.size &&
                game.player.x + game.player.size > trap.x &&
                game.player.y < trap.y + trap.size &&
                game.player.y + game.player.size > trap.y) {
                game.player.speed = 0;
                trap.trap = true;
            }
            if (trap.trap && trap.timer >= trap.trapTime * 50) {
                Traps.splice(index, 1);
                game.player.speed = 4;
            }
        });
    }
}
//# sourceMappingURL=trap.js.map