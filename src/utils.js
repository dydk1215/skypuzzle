export const create = (tag, className) => {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    return el;
}

export const getRandNums = (max) => {
    const randnums = [];
    while (randnums.length < (max - 1)) {
        const randnum = Math.floor(Math.random() * (max - 1));
        if (randnums.indexOf(randnum) < 0) randnums.push(randnum);
    }
    return randnums;
}