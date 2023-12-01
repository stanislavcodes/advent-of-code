import { readFileSync } from 'fs';

const input = readFileSync('day1/input.txt', 'utf8').split('\n');

let [calories, current] = [[], 0];
for (let i = 0, j = 0; i <= input.length; i++) {
  if (input[i] === '\r' || input[i] === '') {
    calories.push(current);
    current = 0;
    j++;
    continue;
  }
  current += Number(input[i]);
}

let b = 0;
for (let i = 0; i < 3; i++) {
  let max = Math.max(...calories);
  calories[calories.indexOf(max)] = 0;
  b += max;
}

export { b };
