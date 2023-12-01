import { readFileSync } from 'fs';

const input = readFileSync('day3/input.txt', 'utf8');
const rucksacks = input.split('\n');
let priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let prioritiesSum = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  for (const item of rucksacks[i]) {
    if (rucksacks[i + 1].includes(item) && rucksacks[i + 2].includes(item)) {
      prioritiesSum += priorities.indexOf(item);
      break;
    }
  }
}

export const b = prioritiesSum;
