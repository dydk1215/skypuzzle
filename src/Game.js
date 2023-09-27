const { shuffleOrder } = require("./src/utils.js");



class Game {
    constructor(id) {
        // this.id = id;
        this.makeBoard();
        this.shuffleImg(id);
        this.answer = this.getAnswer(id);
    }

    makeBoard() {
        for (let i = 0; i < YTILES; i++) {
            for (let j = 0; j < XTILES; j++) {
                const tile = create("div");
                tile.classList.add("tile", `x${j}`, `y${i}`);
                if (i === (YTILES - 1) && j === (XTILES - 1)) tile.classList.add("empty");
                tile.addEventListener("click", this.makeMove);
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

    getAnswer(id) {
        const answer = new Map();
        for (let i = 0; i < pictures[id].length; i++) {
            if (i === pictures[id].length - 1) answer.set(i, "empty");
            else answer.set(i, pictures[id][i]);
        }

        return answer;
    }

    static getCoords(classes) {
        let x, y;
        for (const coord of classes) {
            if (coord[0] === "x") x = parseInt(coord.substring(1));
            if (coord[0] === "y") y = parseInt(coord.substring(1));
        }
        const coords = { 'x': x, 'y': y };
        return coords;
    }

    makeMove() {
        const target = event.target;

        // get coordinates of target (separate method in game class)
        // create tile class with constructors this.x and this.y
        const coordinates = target.classList;
        const targetCoords = Game.getCoords(coordinates);
        const targetStyle = target.style.backgroundImage.split('"');
        const targetImg = targetStyle[1];

        // get coordinates of empty (merge with target method above - use target as parameter; default to .empty if target not specified)
        // create new class object that stores coordinates of target tile
        const empty = document.querySelector(".empty"); // can pull to constants (empty_tile)
        const emptyCoordsList = empty.classList;
        const emptyCoords = Game.getCoords(emptyCoordsList);

        // compare places
        if (targetCoords.x === emptyCoords.x) {
            if (Math.abs(targetCoords.y - emptyCoords.y) === 1) isNext = true;
            else return;
        }
        else if (targetCoords.y === emptyCoords.y) {
            if (Math.abs(targetCoords.x - emptyCoords.x) === 1) isNext = true;
            else return;
        }
        else return;


        // reprint tiles
        let mystr = '';
        // save element info of tiles as one string to replace innerHTML later
        let k = 0;
        for (let i = 0; i < YTILES; i++) {
            for (let j = 0; j < XTILES; j++, k++) {
                // check if match with target -- if yes replace with empty's coords
                if (i === targetCoords.y && j === targetCoords.x) {
                    mystr += `<div class="tile x${targetCoords.x} y${targetCoords.y} empty" onclick="${this.makeMove}()"></div>`;
                }
                // check if match with empty
                else if (i === emptyCoords.y && j === emptyCoords.x) {
                    mystr += `<div class="tile x${emptyCoords.x} y${emptyCoords.y}" style="background-image: url(${targetImg});" onclick="${this.makeMove}()"></div>`;
                }
                else {
                    // get background image
                    const childStyle = tiles[k].style.backgroundImage.split('"');
                    const bgimg = childStyle[1];
                    mystr += `<div class="tile x${j} y${i}" style="background-image: url(${bgimg})" onclick="${this.makeMove}()"></div>`;
                }
            }
        }

        grid.innerHTML = mystr;
        isNext = false;

        // check this condition with every reprint
        if (grid.lastElementChild.classList.contains("empty")) this.checkWin();
    }

    checkWin() {
        console.log("---fired---")
        const winning = [];
        for (let i = 0; i < CAP; i++) {
            const el = tiles[i].style.backgroundImage.split('"'); // will need to define children here; separate as a util function for extracting background image url
            const img = el[1] // el[1] will be returned by new method above

            // determine whether sequence matches
            if (this.answer.get(i) === img) winning.push(true);
            else if (img === undefined) {
                if (this.answer.get(i) === "empty") continue;
                else winning.push(false);
            }
            else winning.push(false);
        }
        // console.log(winning)
        if (winning.indexOf(false) < 0) console.log("winner!")
    }
}
