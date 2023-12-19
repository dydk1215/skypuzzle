import { X_TILES, Y_TILES, board, PICTURES } from "./constants.js";
import { create, shuffleOrder } from "./utils.js";
import Game from "./Game.js";

export default class NewGame {
  constructor(id) {
    this.drawBoard();
    this.game = new Game(id);
    this.size = window.innerWidth < 700 ? "small" : "big";
    this.shuffleImg(id);
    this.addResizeListener();
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
    const unit = window.innerWidth < 700 ? 125 : 200;

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

        leftSpace += unit;
      }
      topSpace += unit;
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

  addResizeListener() {
    document.querySelector(".grid").addEventListener("transitionstart", () => {
      if (window.innerWidth >= 700 && this.size === "small") {
        this.resizeTiles("big");
        this.size = "big";
        return;
      }
      if (window.innerWidth < 700 && this.size === "big") {
        this.resizeTiles("small");
        this.size = "small";
      }
    });
  }

  resizeTiles(size) {
    const tiles = document.querySelector(".grid").children;
    switch (size) {
      case "big":
        {
          for (const tile of tiles) {
            const left = Number(
              tile.style.left.substring(0, tile.style.left.indexOf("px"))
            );
            tile.style.left = left * 1.6 + "px";

            const top = Number(
              tile.style.top.substring(0, tile.style.top.indexOf("px"))
            );
            tile.style.top = top * 1.6 + "px";
          }
        }
        break;
      case "small":
        {
          for (const tile of tiles) {
            const left = Number(
              tile.style.left.substring(0, tile.style.left.indexOf("px"))
            );
            tile.style.left = left / 1.6 + "px";

            const top = Number(
              tile.style.top.substring(0, tile.style.top.indexOf("px"))
            );
            tile.style.top = top / 1.6 + "px";
          }
        }
        break;
      default:
    }
  }
}
