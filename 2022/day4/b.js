import { readFileSync } from 'fs';

const input = readFileSync('day4/input.txt', 'utf8').split('\n');
const pairs = input.map((line) => line.split(','));
let assignmentPairs = 0;

pairs.forEach((pair) => {
  let r1 = pair[0].split('-').map((s) => Number(s));
  let r2 = pair[1].split('-').map((s) => Number(s));
  let [one, two] = [[], []];
  for (let i = r1[0]; i <= r1[1]; i++) one.push(i);
  for (let i = r2[0]; i <= r2[1]; i++) two.push(i);
  for (let item of one) {
    if (two.includes(item)) {
      assignmentPairs++;
      break;
    }
  }
});

export const b = assignmentPairs;
