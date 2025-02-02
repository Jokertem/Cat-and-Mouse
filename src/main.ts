import { Player } from "./player.js";
import { drawMap, map, setCanvasSize, tileSize } from "./tilemap.js";
import { setEvents } from "./keyEvent.js";

const canvas: HTMLCanvasElement = document.querySelector(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const game = {
  canvasSize: setCanvasSize(),
  map: map,
  player: new Player(2 * tileSize, 9 * tileSize, 4),
  keys: {
    Up: false,
    Down: false,
    Left: false,
    Right: false,
  },
};
setEvents(game);

canvas.width = game.canvasSize.width;
canvas.height = game.canvasSize.height;

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#825b0e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx);
  game.player.draw(ctx);
  game.player.update(game);
  requestAnimationFrame(animate);
};
animate();
