const create = (tag, className) => {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    return el;
}

const getRandNums = (max) => {
    const randnums = [];
    while (randnums.length < (max - 1)) {
        const randnum = Math.floor(Math.random() * (max - 1));
        if (randnums.indexOf(randnum) < 0) randnums.push(randnum);
    }
    return randnums;
}

const checkValidity = (array) => {
    let count = 0;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) count++;
        }
    }
    return count % 2 === 0;
}

const shuffleOrder = () => {
    let randnums;
    do {
        randnums = getRandNums(CAP);
    } while (!checkValidity(randnums))
    return randnums;
}

module.exports = { create, getRandNums, checkValidity, shuffleOrder }
