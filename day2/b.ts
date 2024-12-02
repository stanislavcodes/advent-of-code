const path = 'day2/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n');

const levels = lines.reduce((acc, line) => {
  acc.push(line.split(' ').map(Number));
  return acc;
}, [] as number[][]);

const maxAllowedDistance = 3;
let safeReportsCount = 0;

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

function checkIfSafeLevel(level: number[]): boolean {
  const isIncreasingOrder = isIncreasing(level);
  const isDecreasingOrder = isDecreasing(level);
  let distances = [];

  for (let i = 0; i < level.length - 1; i++) {
    distances.push(Math.abs(level[i] - level[i + 1]));
  }

  const maxDistance = Math.max(...distances);

  return (
    (isIncreasingOrder || isDecreasingOrder) &&
    maxDistance >= 1 &&
    maxDistance <= maxAllowedDistance
  );
}

for (let i = 0; i < levels.length; i++) {
  if (checkIfSafeLevel(levels[i])) {
    safeReportsCount++;
    continue;
  }

  let atLeastOneSafe = false;
  let unsafeCount = 0;

  for (let j = 0; j < levels[i].length; j++) {
    const withoutJ = levels[i].toSpliced(j, 1);
    const result = checkIfSafeLevel(withoutJ);

    if (result) {
      atLeastOneSafe = true;
      continue;
    }

    unsafeCount++;
  }

  if (atLeastOneSafe || unsafeCount === 1) {
    safeReportsCount++;
  }
}

console.log('How many reports are safe?', safeReportsCount);
