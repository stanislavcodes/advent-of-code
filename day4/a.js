import { readFileSync } from 'fs';

const input = readFileSync('day4/input.txt', 'utf8').split('\n');
const pairs = input.map((line) => line.split(','));
let assignmentPairs = 0;

pairs.forEach((pair) => {
  let r1 = pair[0].split('-').map((s) => Number(s));
  let r2 = pair[1].split('-').map((s) => Number(s));
  if (r1[0] >= r2[0] && r1[1] <= r2[1]) {
    assignmentPairs++;
  } else if (r1[0] <= r2[0] && r1[1] >= r2[1]) {
    assignmentPairs++;
  }
});

export const a = assignmentPairs;
