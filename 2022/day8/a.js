import { readFileSync } from 'fs';

const input = readFileSync('day8/input.txt', 'utf8').split('\n');

const edge = (input.length + input[0].slice(1, -1).length) * 2;
const numGrid = input.map((line) => line.split('').map((num) => parseInt(num)));
let interior = 0;

for (let i = 1; i < numGrid.length - 1; i++) {
  for (let j = 1; j < numGrid[i].length - 1; j++) {
    const curr = numGrid[i][j];
    const left = numGrid[i].slice(0, j);
    const right = numGrid[i].slice(j + 1);
    let [up, down] = [[], []];
    let visible;

    for (let y = 0; y < numGrid.length; y++) {
      if (y < i) {
        up.push(numGrid[y][j]);
      } else if (y > i) {
        down.push(numGrid[y][j]);
      } else {
        if (y === i) continue;
      }
    }

    for (let arr of [up, left, right, down]) {
      visible = true;
      for (let num of arr) {
        if (num >= curr) visible = false;
      }
      if (visible) break;
    }
    if (visible) {
      interior++;
    }
  }
}

export const a = interior + edge;
