import { Player } from "./player.js";
import { drawMap, map, setCanvasSize, tileSize } from "./tilemap.js";
import { setEvents } from "./keyEvent.js";
import { Cheese } from "./cheese.js";
import { Cat } from "./cat.js";

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
  animationSpeed: 15,
  maxCheese: 3,
  maxCats: 0,
};
setEvents(game);

canvas.width = game.canvasSize.width;
canvas.height = game.canvasSize.height;

const gameHarder = () => {
  if (game.player.cheeses >= 2) {
    game.maxCats = 1;
  }
  if (game.player.cheeses >= 15) {
    game.maxCheese = 4;
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#825b0e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMap(ctx);
  game.player.draw(ctx, game);
  game.player.update(game);
  Cheese.draw(ctx);
  Cheese.update(game);
  Cat.draw(ctx, game);
  Cat.update(game);
  gameHarder();
  document.querySelector<HTMLElement | any>(
    ".cheeseCount"
  ).innerText = `Cheese ${game.player.cheeses}`;
  requestAnimationFrame(animate);
};
animate();
