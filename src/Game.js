import { CAP, PICTURES, X_INDEX } from "./constants.js";
import { getCoords, getImgUrl } from "./utils.js";
import Timer from "./Timer.js";

export default class Game {
  constructor(id) {
    this.id = id;
    this.answer = this.getAnswer(id);
    this.timer = new Timer(id);
  }

  getAnswer(id) {
    const answer = new Map();

    for (let i = 0; i < PICTURES[id].length - 1; i++) {
      const key =
        "x" + PICTURES[id][i][X_INDEX - 1] + "y" + PICTURES[id][i][X_INDEX + 1];
      answer.set(key, PICTURES[id][i]);
    }

    return answer;
  }

  switchTiles(curTarget, curEmpty) {
    const curTargetLeft = curTarget.style.left;
    const curTargetTop = curTarget.style.top;
    const curEmptyLeft = curEmpty.style.left;
    const curEmptyTop = curEmpty.style.top;

    curTarget.style.left = curEmptyLeft;
    curTarget.style.top = curEmptyTop;
    curEmpty.style.left = curTargetLeft;
    curEmpty.style.top = curTargetTop;

    const curTargetCoords = [...curTarget.classList];
    const curEmptyCoords = [...curEmpty.classList];

    curTarget.classList.remove(...curTargetCoords);
    curTarget.classList.add(...curEmptyCoords);
    curTarget.classList.remove("empty");
    curEmpty.classList.remove(...curEmptyCoords);
    curEmpty.classList.add(...curTargetCoords, "empty");
  }

  makeMove(event) {
    const targetTile = event.target;
    const emptyTile = document.querySelector(".empty");
    const targetCoords = getCoords(targetTile.classList);
    const emptyCoords = getCoords(emptyTile.classList);

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

    this.switchTiles(targetTile, emptyTile);

    const grid = document.querySelector(".grid");

    const lastChildClasses = [...grid.lastElementChild.classList];
    if (
      lastChildClasses.includes("empty") &&
      lastChildClasses.includes("x2") &&
      lastChildClasses.includes("y2")
    ) {
      return this.checkWin();
    }
  }

  checkWin() {
    const tiles = document.querySelector(".grid").children;

    for (let i = 0; i < CAP - 1; i++) {
      const key = [...tiles[i].classList]
        .filter((className) => className.length === 2)
        .join("");
      const imgUrl = getImgUrl(tiles[i]);

      if (this.answer.get(key) !== imgUrl) return;
    }

    this.timer.endTimer();
    return this.printWinner();
  }

  printWinner() {
    document.querySelector(".grid").classList.add("mouse-disabled");
    this.updateData();
  }

  updateData() {
    const gameId = "p" + this.id;
    const newRecord = {};
    newRecord[gameId] = this.timer.timer;
    const localData = localStorage.getItem("tspdata");

    if (!localData) {
      localStorage.setItem("tspdata", JSON.stringify(newRecord));
      return;
    }

    const parsedData = JSON.parse(localData);

    if (!parsedData[gameId] || this.timer.timer < parsedData[gameId]) {
      parsedData[gameId] = this.timer.timer;
      localStorage.setItem("tspdata", JSON.stringify(parsedData));
      return;
    }
  }
}
