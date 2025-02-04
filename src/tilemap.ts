export const tileSize = 44;
// 0 = null
// 1 = wall
export const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
];

export const setCanvasSize = () => {
  const width = map[0].length * tileSize;
  const height = map.length * tileSize;
  return { width: width, height: height };
};

export const drawMap = (ctx: CanvasRenderingContext2D) => {
  map.forEach((row, i) => {
    row.forEach((col, j) => {
      ctx.strokeStyle = "red";
      ctx.strokeRect(j * tileSize, i * tileSize, tileSize, tileSize);

      switch (col) {
        case 0:
          break;
        case 1:
          ctx.fillStyle = "#000000";
          ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
          break;
        default:
          break;
      }
    });
  });
};
