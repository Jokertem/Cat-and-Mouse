import { Player } from "./player.js";
import { drawMap, map, setCanvasSize, tileSize } from "./tilemap.js";
import { setEvents } from "./keyEvent.js";
import { Cheese } from "./cheese.js";
import { Cat } from "./cat.js";
import { Trap } from "./trap.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
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
    maxTrap: 4,
    cheeseWinCount: 100,
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
    var _a, _b;
    if (!game.pauza &&
        !game.gameOver &&
        game.player.cheeses < game.cheeseWinCount) {
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
        document.querySelector(".cheeseCount").innerText = `Cheese ${game.player.cheeses}`;
    }
    else if (game.gameOver) {
        const gameOverWindow = document.querySelector(".gameOver");
        if (gameOverWindow.style.display !== "flex") {
            gameOverWindow.style.display = "flex";
            (_a = document
                .querySelector(".restart")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                window.location.reload();
            });
            document.querySelector(".gameOver__cheese").innerText = `You Have ${game.player.cheeses} chesses`;
        }
    }
    else if (game.player.cheeses >= game.cheeseWinCount) {
        const gameWinWindow = document.querySelector(".win");
        if (gameWinWindow.style.display !== "flex") {
            gameWinWindow.style.display = "flex";
            (_b = document
                .querySelector(".winRestart")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                window.location.reload();
            });
            document.querySelector(".gameOver__cheese").innerText = `You Have ${game.player.cheeses} cheeses`;
        }
    }
    requestAnimationFrame(animate);
};
animate();
//# sourceMappingURL=main.js.map