const { XTILES, YTILES, CAP, grid, pictures, tiles } = require("./constants.js");
const { create, getRandNums, checkValidity, shuffleOrder, getCoords, getImgURL } = require("./utils.js");

class NewGame {
    constructor(id) {
        this.drawBoard();
        this.shuffleImg(id);
        this.game = new Game(id);
    }

    drawBoard() {
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

class Game {
    constructor(id) {
        this.id = id;
        this.answer = this.getAnswer(id);
    }

    getAnswer(id) {
        const answer = new Map();
        for (let i = 0; i < pictures[id].length; i++) {
            if (i === pictures[id].length - 1) answer.set(i, "empty");
            else answer.set(i, pictures[id][i]);
        }
        return answer;
    }

    switchTiles(curTarget, curEmpty, img) {
        curEmpty.classList.remove("empty");
        curEmpty.style.backgroundImage = `url(${img})`;
        curTarget.classList.add("empty");
        curTarget.removeAttribute("style");
    }

    getTileImg(index) {
        const el = tiles[index].style.backgroundImage.split('"');
        return el[1];
    }

    makeMove() {
        const targetTile = event.target;
        const emptyTile = document.querySelector(".empty");
        const targetCoords = getCoords(targetTile.classList);
        const emptyCoords = getCoords(emptyTile.classList);
        const targetImg = getImgURL(targetTile);

        if (targetCoords.x !== emptyCoords.x && targetCoords.y !== emptyCoords.y) return;
        if (targetCoords.x === emptyCoords.x && Math.abs(targetCoords.y - emptyCoords.y) !== 1) return;
        if (targetCoords.y === emptyCoords.y && Math.abs(targetCoords.x - emptyCoords.x) !== 1) return;

        this.switchTiles(targetTile, emptyTile, targetImg);

        if (grid.lastElementChild.classList.contains("empty")) this.checkWin();
    }

    checkWin() {
        const winning = [];
        for (let i = 0; i < CAP; i++) {
            const img = this.getTileImg(i);
            if (img === undefined && this.answer.get(i) === "empty") continue;
            if (this.answer.get(i) === img) winning.push(true);
            else winning.push(false);
        }
        if (winning.indexOf(false) < 0) this.printWinner();
    }

    printWinner() {
        console.log("winner!");
    }
}

module.exports = { NewGame, Game }
