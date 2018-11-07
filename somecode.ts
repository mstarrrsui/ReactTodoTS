let dateStr = '041118';
let [m, d, y] = [0, 2, 4].map(offset => dateStr.substring(offset, offset + 2));
console.log({ m, d, y });
