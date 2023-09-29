const XTILES = 3;
const YTILES = 3;
const CAP = 9;
const grid = document.querySelector(".grid");
const tiles = grid.children;
const pictures = [
    ["./img/p01/0x0.jpg", "./img/p01/1x0.jpg", "./img/p01/2x0.jpg", "./img/p01/0x1.jpg", "./img/p01/1x1.jpg", "./img/p01/2x1.jpg", "./img/p01/0x2.jpg", "./img/p01/1x2.jpg", "./img/p01/2x2.jpg"],
    ["./img/p02/0x0.jpg", "./img/p02/1x0.jpg", "./img/p02/2x0.jpg", "./img/p02/0x1.jpg", "./img/p02/1x1.jpg", "./img/p02/2x1.jpg", "./img/p02/0x2.jpg", "./img/p02/1x2.jpg", "./img/p02/2x2.jpg"],
    ["./img/p03/0x0.jpg", "./img/p03/1x0.jpg", "./img/p03/2x0.jpg", "./img/p03/0x1.jpg", "./img/p03/1x1.jpg", "./img/p03/2x1.jpg", "./img/p03/0x2.jpg", "./img/p03/1x2.jpg", "./img/p03/2x2.jpg"],
    ["./img/p04/0x0.jpg", "./img/p04/1x0.jpg", "./img/p04/2x0.jpg", "./img/p04/0x1.jpg", "./img/p04/1x1.jpg", "./img/p04/2x1.jpg", "./img/p04/0x2.jpg", "./img/p04/1x2.jpg", "./img/p04/2x2.jpg"],
    ["./img/p05/0x0.jpg", "./img/p05/1x0.jpg", "./img/p05/2x0.jpg", "./img/p05/0x1.jpg", "./img/p05/1x1.jpg", "./img/p05/2x1.jpg", "./img/p05/0x2.jpg", "./img/p05/1x2.jpg", "./img/p05/2x2.jpg"],
    ["./img/p06/0x0.jpg", "./img/p06/1x0.jpg", "./img/p06/2x0.jpg", "./img/p06/0x1.jpg", "./img/p06/1x1.jpg", "./img/p06/2x1.jpg", "./img/p06/0x2.jpg", "./img/p06/1x2.jpg", "./img/p06/2x2.jpg"],
    ["./img/p07/0x0.jpg", "./img/p07/1x0.jpg", "./img/p07/2x0.jpg", "./img/p07/0x1.jpg", "./img/p07/1x1.jpg", "./img/p07/2x1.jpg", "./img/p07/0x2.jpg", "./img/p07/1x2.jpg", "./img/p07/2x2.jpg"],
    ["./img/p08/0x0.jpg", "./img/p08/1x0.jpg", "./img/p08/2x0.jpg", "./img/p08/0x1.jpg", "./img/p08/1x1.jpg", "./img/p08/2x1.jpg", "./img/p08/0x2.jpg", "./img/p08/1x2.jpg", "./img/p08/2x2.jpg"]
];

export { XTILES, YTILES, CAP, grid, tiles, pictures }
