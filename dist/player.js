import { Directions } from "./directions.js";
import { tileSize } from "./tilemap.js";
const rat = new Image();
rat.src = "assets/Rats.png";
export class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.prevX = x;
        this.prevY = y;
        this.cheese = 0;
        this.size = 32;
        this.cheeses = 0;
        this.direction = Directions.RIGHT;
        this.currentFrame = 0;
        this.frameLimiter = 0;
    }
    draw(ctx, game) {
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
                ctx.drawImage(rat, cycleFrames1[this.currentFrame], 23, 28, 24, this.x, this.y, this.size, this.size);
                break;
            case Directions.LEFT:
                ctx.drawImage(rat, cycleFrames2[this.currentFrame], 75, 47, 18, this.x, this.y, this.size, this.size);
                break;
            case Directions.RIGHT:
                ctx.drawImage(rat, cycleFrames3[this.currentFrame], 123, 47, 18, this.x, this.y, this.size, this.size);
                break;
            case Directions.UP:
                ctx.drawImage(rat, cycleFrames4[this.currentFrame], 165, 28, 23, this.x, this.y, this.size, this.size);
                break;
            default:
                break;
        }
        if (this.frameLimiter >= 14)
            this.currentFrame++;
        if (this.currentFrame >= cycleFrames1.length) {
            this.currentFrame = 0;
        }
    }
    update(game) {
        //Colosions with canvas border
        if (this.y <= 0)
            this.y = 0;
        if (this.y + this.size >= game.canvasSize.height)
            this.y = game.canvasSize.height - this.size;
        if (this.x <= 0)
            this.x = 0;
        if (this.x + this.size >= game.canvasSize.width)
            this.x = game.canvasSize.width - this.size;
        //Colosions with walls
        game.map.forEach((row, i) => {
            row.forEach((col, j) => {
                const tileX = j * tileSize;
                const tileY = i * tileSize;
                if (col == 1 &&
                    this.x < tileX + tileSize &&
                    this.x + this.size > tileX &&
                    this.y < tileY + tileSize &&
                    this.y + this.size > tileY) {
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
        }
        else if (game.keys.Down) {
            this.direction = Directions.DOWN;
            this.y += this.speed;
        }
        else if (game.keys.Left) {
            this.direction = Directions.LEFT;
            this.x -= this.speed;
        }
        else if (game.keys.Righ) {
            this.direction = Directions.RIGHT;
            this.x += this.speed;
        }
    }
}
//# sourceMappingURL=player.js.map