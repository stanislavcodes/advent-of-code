const path = 'day2/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n');

const levels = lines.reduce((acc, line) => {
  acc.push(line.split(' ').map(Number));
  return acc;
}, [] as number[][]);

function isIncreasing(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] >= arr[i + 1]) {
      return false;
    }
  }
  return true;
}

function isDecreasing(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] <= arr[i + 1]) {
      return false;
    }
  }
  return true;
}

const maxAllowedDistance = 3;
let safeReportsCount = 0;

for (let i = 0; i < levels.length; i++) {
  const isIncreasingOrder = isIncreasing(levels[i]);
  const isDecreasingOrder = isDecreasing(levels[i]);
  let maxDistance = 0;

  for (let j = 0; j < levels[i].length - 1; j++) {
    const distance = Math.abs(levels[i][j] - levels[i][j + 1]);

    if (distance > maxDistance) {
      maxDistance = distance;
    }
  }

  if (
    maxDistance >= 1 &&
    maxDistance <= maxAllowedDistance &&
    (isIncreasingOrder || isDecreasingOrder)
  ) {
    safeReportsCount++;
  }
}

console.log('How many reports are safe?', safeReportsCount);
