import { tileSize, map } from "./tilemap.js";
import { isColision, setRandomPosition } from "./utils.js";
const Traps: Trap[] = [];
const trapSize = 32;
const trapImgage = new Image();
trapImgage.src = "assets/Trap.png";
export class Trap {
  x: number;
  y: number;
  size: number;
  trapTime: number;
  timer: number;
  trap: boolean;
  currentFrame: number;
  private constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.trapTime = 2;
    this.timer = 0;
    this.trap = false;
    this.currentFrame = 0;
  }
  static draw(cxt: CanvasRenderingContext2D, game: unknown) {
    const cycleFrames = [0, 35, 35 * 2, 35 * 3];
    Traps.forEach((trap) => {
      cxt.drawImage(
        trapImgage,
        cycleFrames[trap.currentFrame],
        0,
        32,
        32,
        trap.x,
        trap.y,
        trap.size,
        trap.size
      );
      if (trap.trap) {
        trap.currentFrame++;
      }
      if (trap.currentFrame >= cycleFrames.length) {
        trap.currentFrame = 3;
      }
    });
  }
  static update(ctx: CanvasRenderingContext2D, game: any) {
    this.draw(ctx, game);
    if (Traps.length < game.maxTrap) {
      const poss = setRandomPosition();
      if (poss === undefined) {
        return;
      }
      const newTrap = new Trap(
        poss.x * tileSize + tileSize / 2 - trapSize / 2,
        poss.y * tileSize + tileSize / 2 - trapSize / 2,
        trapSize
      );
      Traps.push(newTrap);
    }
    //Colosions with player
    Traps.forEach((trap, index) => {
      if (trap.trap) {
        trap.timer++;
      }

      if (isColision(game.player, trap)) {
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
