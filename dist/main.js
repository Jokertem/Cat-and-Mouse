import { drawMap, map, setCanvasSize } from "./tilemap.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = {
    canvasSize: setCanvasSize(),
    map: map,
};
canvas.width = game.canvasSize.width;
canvas.height = game.canvasSize.height;
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#825b0e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMap(ctx);
    requestAnimationFrame(animate);
};
animate();
//# sourceMappingURL=main.js.map