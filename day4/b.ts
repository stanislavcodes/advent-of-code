const path = 'day4/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n');

type XMAS = {
  topLeft: string;
  topRight: string;
  middle: string;
  bottomLeft: string;
  bottomRight: string;
};

const xArray: Array<XMAS> = [];

for (let i = 1; i < lines.length - 1; i++) {
  let topLeft = '';
  let topRight = '';
  let middle = '';
  let bottomLeft = '';
  let bottomRight = '';

  for (let j = 1; j < lines[i].length - 1; j++) {
    middle = lines[i][j];
    topLeft = lines[i - 1][j - 1];
    topRight = lines[i - 1][j + 1];
    bottomLeft = lines[i + 1][j - 1];
    bottomRight = lines[i + 1][j + 1];

    xArray.push({
      topLeft,
      topRight,
      middle,
      bottomLeft,
      bottomRight,
    });
  }
}

let count = 0;

xArray.forEach((x) => {
  const isMiddleA = x.middle === 'A';
  const isTopM = x.topLeft === 'M' && x.topRight === 'M';
  const isLeftM = x.topLeft === 'M' && x.bottomLeft === 'M';
  const isRightM = x.topRight === 'M' && x.bottomRight === 'M';
  const isBottomM = x.bottomLeft === 'M' && x.bottomRight === 'M';
  const isTopS = x.topLeft === 'S' && x.topRight === 'S';
  const isLeftS = x.topLeft === 'S' && x.bottomLeft === 'S';
  const isRightS = x.topRight === 'S' && x.bottomRight === 'S';
  const isBottomS = x.bottomLeft === 'S' && x.bottomRight === 'S';

  if (
    isMiddleA &&
    ((isTopM && isBottomS) ||
      (isLeftM && isRightS) ||
      (isRightM && isLeftS) ||
      (isBottomM && isTopS))
  ) {
    count++;
  }
});

console.log('How many times does X-MAS appear?', count);
