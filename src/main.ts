import { drawMap, map, setCanvasSize } from "./tilemap.js";

const canvas: HTMLCanvasElement = document.querySelector(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

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
