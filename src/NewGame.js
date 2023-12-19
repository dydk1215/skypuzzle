import { X_TILES, Y_TILES, board, PICTURES } from "./constants.js";
import { create, shuffleOrder } from "./utils.js";
import Game from "./Game.js";

export default class NewGame {
  constructor(id) {
    this.drawBoard();
    this.game = new Game(id);
    this.shuffleImg(id);
  }

  drawBoard() {
    const grid = create("div");
    grid.classList.add("grid");
    const boardMenu = create("div");
    boardMenu.classList.add("board-menu");
    const timer = create("div");
    timer.textContent = "00:00";
    timer.classList.add("timer");

    const backButton = create("button");
    backButton.textContent = "Back";
    backButton.onclick = this.handleBackButton;

    board.append(grid);
    board.append(boardMenu);
    boardMenu.append(backButton);
    boardMenu.append(timer);
    this.drawTiles(grid);
  }

  drawTiles(grid) {
    let leftSpace = 0;
    let topSpace = 0;

    for (let i = 0; i < Y_TILES; i++) {
      for (let j = 0; j < X_TILES; j++) {
        const tile = create("div");
        tile.classList.add("tile", `x${j}`, `y${i}`);
        tile.style.left = `${leftSpace}px`;
        tile.style.top = `${topSpace}px`;
        if (i === Y_TILES - 1 && j === X_TILES - 1) tile.classList.add("empty");

        tile.addEventListener("click", (e) => {
          this.game.makeMove(e);
        });
        grid.append(tile);

        leftSpace += 200;
      }
      topSpace += 200;
      leftSpace = 0;
    }
  }

  shuffleImg(id) {
    const tiles = document.querySelector(".grid").children;
    const randnums = shuffleOrder();
    for (let i = 0; i < tiles.length - 1; i++) {
      tiles[i].style.backgroundImage = `url(${PICTURES[id][randnums[i]]})`;
    }
  }

  handleBackButton() {
    const menuDiv = document.querySelector(".menu");
    menuDiv.classList.toggle("invisible");
    board.innerHTML = "";
    board.classList.toggle("invisible");
  }
}
