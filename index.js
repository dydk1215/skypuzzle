import { XTILES, YTILES, grid } from "./src/constants.js"
import { create, shuffleOrder } from "./src/utils.js"
import Game from "./src/Game.js"

class NewGame {
    constructor(id) {
        this.drawBoard();
        this.shuffleImg(id);
        this.game = new Game(id);
    }

    drawBoard() {
        console.log(XTILES)
        console.log(grid)
        for (let i = 0; i < YTILES; i++) {
            for (let j = 0; j < XTILES; j++) {
                const tile = create("div");
                tile.classList.add("tile", `x${j}`, `y${i}`);
                if (i === (YTILES - 1) && j === (XTILES - 1)) tile.classList.add("empty");
                tile.addEventListener("click", (e) => {
                    // e.preventDefault();
                    this.game.makeMove();
                });
                grid.append(tile);
            }
        }
    }

    shuffleImg(id) {
        const randnums = shuffleOrder();
        for (let i = 0; i < tiles.length - 1; i++) {
            tiles[i].style.backgroundImage = `url(${pictures[id][randnums[i]]})`;
        }
    }
}

new NewGame(7);
