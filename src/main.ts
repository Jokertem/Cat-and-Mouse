import { Player } from "./player.js";
import { drawMap, map, setCanvasSize, tileSize } from "./tilemap.js";
import { setEvents } from "./keyEvent.js";
import { Cheese } from "./cheese.js";
import { Cat } from "./cat.js";
import { Trap } from "./trap.js";

const canvas: HTMLCanvasElement = document.querySelector(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const game = {
  pauza: false,
  gameOver: false,
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
  maxCheese: 2,
  maxCats: 0,
  maxTrap: 0,
  cheeseWinCount: 100,
};
setEvents(game);

canvas.width = game.canvasSize.width;
canvas.height = game.canvasSize.height;

const gameHarder = () => {
  if (game.player.cheeses >= 2) {
    game.maxCats = 1;
  }
  if (game.player.cheeses >= 12) {
    game.maxCheese = 3;
  }
  if (game.player.cheeses >= 16) {
    game.maxCats = 2;
  }
  if (game.player.cheeses >= 24) {
    game.maxCheese = 4;
  }
  if (game.player.cheeses >= 32) {
    game.maxTrap = 1;
  }
  if (game.player.cheeses >= 35) {
    game.maxCats = 3;
  }
  if (game.player.cheeses >= 39) {
    game.maxCheese = 5;
  }
  if (game.player.cheeses >= 42) {
    game.maxCats = 4;
  }
  if (game.player.cheeses >= 46) {
    game.maxTrap = 2;
  }
  if (game.player.cheeses >= 52) {
    game.maxTrap = 3;
    game.maxCats = 4;
  }
  if (game.player.cheeses >= 58) {
    game.maxTrap = 4;
    game.maxCheese = 6;
  }
  if (game.player.cheeses >= 62) {
    game.maxCats = 5;
  }
  if (game.player.cheeses >= 82) {
    game.maxCats = 6;
    game.maxTrap = 5;
  }
};

const animate = () => {
  if (
    !game.pauza &&
    !game.gameOver &&
    game.player.cheeses < game.cheeseWinCount
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#825b0e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMap(ctx);
    game.player.draw(ctx, game);
    game.player.update(game);
    Cheese.update(game, ctx);
    Cat.update(game, ctx);
    Trap.update(ctx, game);
    gameHarder();
    document.querySelector<HTMLElement | any>(
      ".cheeseCount"
    ).innerText = `Cheese ${game.player.cheeses}`;
  } else if (game.gameOver) {
    const gameOverWindow: HTMLElement = document.querySelector(
      ".gameOver"
    ) as HTMLElement;
    if (gameOverWindow.style.display !== "flex") {
      gameOverWindow.style.display = "flex";
      document
        .querySelector<HTMLElement>(".restart")
        ?.addEventListener("click", () => {
          window.location.reload();
        });
      document.querySelector<HTMLSpanElement | any>(
        ".gameOver__cheese"
      ).innerText = `You Have ${game.player.cheeses} chesses`;
    }
  } else if (game.player.cheeses >= game.cheeseWinCount) {
    const gameWinWindow: HTMLElement = document.querySelector(
      ".win"
    ) as HTMLElement;
    if (gameWinWindow.style.display !== "flex") {
      gameWinWindow.style.display = "flex";
      document
        .querySelector<HTMLElement>(".winRestart")
        ?.addEventListener("click", () => {
          window.location.reload();
        });
      document.querySelector<HTMLSpanElement | any>(
        ".gameOver__cheese"
      ).innerText = `You Have ${game.player.cheeses} cheeses`;
    }
  }
  requestAnimationFrame(animate);
};
animate();
