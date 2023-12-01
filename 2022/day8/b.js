import { readFileSync } from 'fs';

const input = readFileSync('day8/input.txt', 'utf8').split('\n');
const numGrid = input.map((line) => line.split('').map((num) => parseInt(num)));

let highestScore = 0; // highestScore scenic score

for (let i = 1; i < numGrid.length - 1; i++) {
  for (let j = 1; j < numGrid[i].length - 1; j++) {
    const curr = numGrid[i][j];
    const left = numGrid[i].slice(0, j);
    const right = numGrid[i].slice(j + 1);
    let [up, down, scenicScore] = [[], [], 1];

    for (let y = 0; y < numGrid.length; y++) {
      if (y < i) {
        up.push(numGrid[y][j]);
      } else if (y > i) {
        down.push(numGrid[y][j]);
      } else {
        if (y === i) continue;
      }
    }

    [up.reverse(), left.reverse(), right, down].forEach((trees) => {
      let currentScore = 0;
      for (let tree of trees) {
        currentScore++;
        if (tree >= curr) break;
      }
      scenicScore *= currentScore;
    });

    if (scenicScore > highestScore) highestScore = scenicScore;
  }
}

export const b = highestScore;

/*
for (let i = 0; i < numGrid.length; i++) {
  for (let j = 0; j < numGrid[i].length; j++) {
    const curr = numGrid[i][j];
    const left = j === 0 ? [0,...numGrid[i].slice(1, j)] : numGrid[i].slice(0, j);
    const right =
      j === numGrid[i].length - 1
        ? numGrid[i].slice(j + 1, -1).push(0)
        : numGrid[i].slice(j + 1);
    let [up, down] = [[], []];
    let visible;

    for (let y = 0; y < numGrid.length; y++) {
      if (y < i) {
        y === 0 && i === 1 ? up.push(0) : up.push(numGrid[y][j]);
      } else if (y > i) {
        y === numGrid[i].length && i === numGrid.length
          ? down.push(0)
          : down.push(numGrid[y][j]);
      } else {
        if (y === i) continue;
      }
    }

    let scenicScore = 1;
    for (let arr of [up, left, right, down]) {
      visible = false;
      currentScore = 0;
      for (let num of arr) {
        if (num < curr) {
          visible = true;
          currentScore++;
        } else {
          break;
        }
      }
      scenicScore *= currentScore;
      if (!visible) break;
    }

    if (scenicScore > highestScore) highestScore = scenicScore;
  }
}
*/
