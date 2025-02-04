export const setEvents = (game: any) => {
  document.addEventListener("keydown", (e) => {
    const key = e.code;

    if (key === "KeyW" || key === "ArrowUp") {
      game.keys.Up = true;
    }
    if (key === "KeyS" || key === "ArrowDown") {
      game.keys.Down = true;
    }
    if (key === "KeyA" || key === "ArrowLeft") {
      game.keys.Left = true;
    }
    if (key === "KeyD" || key === "ArrowRight") {
      game.keys.Righ = true;
    }
    if (key === "Space" || key === "KeyP") {
      game.pauza = !game.pauza;
    }
    if (key === "Enter") {
      if (game.gameOver || game.player.cheeses >= game.cheeseWinCount) {
        window.location.reload();
      }
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
