import { map } from "./tilemap.js";
export const isColision = (rect1: any, rect2: any) => {
  return (
    rect1.x < rect2.x + rect2.size &&
    rect1.x + rect1.size > rect2.x &&
    rect1.y < rect2.y + rect2.size &&
    rect1.y + rect1.size > rect2.y
  );
};
export const setRandomPosition = () => {
  const row = Math.floor(Math.random() * map.length);
  const col = Math.floor(Math.random() * map[0].length);
  const tile = map[row][col];
  if (tile === 1) {
    return;
  } else return { x: col, y: row };
};
