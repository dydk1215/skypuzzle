import { CAP, grid, tiles, pictures } from "./constants.js"
import { getCoords, getImgURL } from "./utils.js"

export default class Game {
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
        const messageArea = document.querySelector(".message");
        messageArea.innerHTML = "🎉やった！🎉";
    }
}
