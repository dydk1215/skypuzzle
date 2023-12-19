import { CAP } from "./constants.js";

const create = (tag, className) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  return el;
};

const getRandNums = (max) => {
  const randnums = [];
  while (randnums.length < max - 1) {
    const randnum = Math.floor(Math.random() * (max - 1));
    if (randnums.indexOf(randnum) < 0) randnums.push(randnum);
  }
  return randnums;
};

const checkValidity = (array) => {
  let count = 0;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) count++;
    }
  }
  return count % 2 === 0;
};

const shuffleOrder = () => {
  let randnums;
  do {
    randnums = getRandNums(CAP);
  } while (!checkValidity(randnums));
  return randnums;
};

const getCoords = (classes) => {
  let x, y;
  for (const coord of classes) {
    if (coord[0] === "x") x = parseInt(coord.substring(1));
    if (coord[0] === "y") y = parseInt(coord.substring(1));
  }
  return { x, y };
};

const getImgUrl = (element) => {
  const imgUrl = element.style.backgroundImage.split('"');
  return imgUrl[1];
};

export {
  create,
  getRandNums,
  checkValidity,
  shuffleOrder,
  getCoords,
  getImgUrl,
};
