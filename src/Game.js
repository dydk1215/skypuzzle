import { CAP, pictures, X_DIRECTION, Y_DIRECTION } from "./constants.js";
import { getCoords, getImgURL } from "./utils.js";
import Timer from "./Timer.js";

export default class Game {
  constructor(id) {
    this.id = id;
    this.answer = this.getAnswer(id);
    this.timer = new Timer(id);
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
    const tiles = document.querySelector(".grid").children;
    const el = tiles[index].style.backgroundImage.split('"');
    return el[1];
  }

  makeMove(event) {
    const targetTile = event.target;
    const emptyTile = document.querySelector(".empty");
    const targetCoords = getCoords(targetTile.classList);
    const emptyCoords = getCoords(emptyTile.classList);
    const targetImg = getImgURL(targetTile);

    if (targetCoords.x !== emptyCoords.x && targetCoords.y !== emptyCoords.y)
      return;
    if (
      targetCoords.x === emptyCoords.x &&
      Math.abs(targetCoords.y - emptyCoords.y) !== 1
    )
      return;
    if (
      targetCoords.y === emptyCoords.y &&
      Math.abs(targetCoords.x - emptyCoords.x) !== 1
    )
      return;

    document.querySelector(".grid").classList.add("mouse-disabled");

    // const moveDirection = this.getMoveDirection(targetCoords, emptyCoords);
    // targetTile.classList.add(`move-${moveDirection}`);

    this.switchTiles(targetTile, emptyTile, targetImg);
    // targetTile.classList.remove(`move-${moveDirection}`);

    const grid = document.querySelector(".grid");
    if (grid.lastElementChild.classList.contains("empty"))
      return this.checkWin();

    return this.reenableMouse();
  }

  reenableMouse() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        document.querySelector(".grid").classList.remove("mouse-disabled");
        resolve(console.log("mouse reenabled"));
      }, 100);
    });
  }

  getMoveDirection(targetCoords, emptyCoords) {
    const xDifference = emptyCoords.x - targetCoords.x;
    if (xDifference !== 0) {
      return X_DIRECTION.get(xDifference);
    }

    const yDifference = targetCoords.y - emptyCoords.y;
    return Y_DIRECTION.get(yDifference);
  }

  checkWin() {
    const winning = [];
    for (let i = 0; i < CAP; i++) {
      const img = this.getTileImg(i);
      if (img === undefined && this.answer.get(i) === "empty") continue;
      if (this.answer.get(i) === img) winning.push(true);
      else winning.push(false);
    }
    if (winning.indexOf(false) < 0) {
      this.timer.endTimer();
      return this.printWinner();
    }
    return this.reenableMouse();
  }

  printWinner() {
    document.querySelector(".grid").classList.add("mouse-disabled");
    const rec = localStorage.getItem("data");
    const record = { gameId: this.id, time: this.timer.timer };
    if (!rec) {
      localStorage.setItem("data", JSON.stringify(record));
    } else {
      const oldRecord = JSON.parse(rec);

      if (
        oldRecord.time[0] > record.time[0] &&
        oldRecord.time[1] >= record.time[1]
      ) {
        localStorage.setItem("data", JSON.stringify(record));
      }
    }
  }
}
