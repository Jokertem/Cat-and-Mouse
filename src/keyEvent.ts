export const setEvents = (game: any) => {
  document.addEventListener("keydown", (e) => {
    const key = e.code;

    if (key === "KeyW" || key === "ArrowUp") {
      restartKey(game.keys);
      game.keys.Up = true;
    }
    if (key === "KeyS" || key === "ArrowDown") {
      restartKey(game.keys);
      game.keys.Down = true;
    }
    if (key === "KeyA" || key === "ArrowLeft") {
      restartKey(game.keys);
      game.keys.Left = true;
    }
    if (key === "KeyD" || key === "ArrowRight") {
      restartKey(game.keys);
      game.keys.Righ = true;
    }
  });

  document.addEventListener("keyup", (e) => {
    const key = e.code;

    if (key === "KeyW" || key === "ArrowUp") {
      game.keys.Up = false;
    }
    if (key === "KeyS" || key === "ArrowDown") {
      game.keys.Down = false;
    }
    if (key === "KeyA" || key === "ArrowLeft") {
      game.keys.Left = false;
    }
    if (key === "KeyD" || key === "ArrowRight") {
      game.keys.Righ = false;
    }
  });
};
const restartKey = (keys: any) => {
  keys.Up = false;
  keys.Down = false;
  keys.Left = false;
  keys.Righ = false;
};
