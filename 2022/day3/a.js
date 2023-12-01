import { readFileSync } from 'fs';

const input = readFileSync('day3/input.txt', 'utf8').split('\n');
const compartments = input.map((rucksack) => [
  rucksack.slice(0, rucksack.length / 2),
  rucksack.slice(rucksack.length / 2),
]);
let priorities = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let prioritiesSum = 0;

for (let compartment of compartments) {
  for (const itemType of compartment[0]) {
    if (compartment[1].includes(itemType)) {
      prioritiesSum += priorities.indexOf(itemType);
      break;
    }
  }
}

export const a = prioritiesSum;
