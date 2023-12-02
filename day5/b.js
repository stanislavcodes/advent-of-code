import { readFileSync } from 'fs';

const input = readFileSync('day5/input.txt', 'utf8').split('\n\n');
const commands = input[1].split('\n');
let [stacks, result] = [[], ''];

for (let i = 0; i < +input[0].match(/\d+/g).pop(); i++) stacks.push([]);

for (let line of input[0].split('\n')) {
  let stackCounter = 1;
  for (let i = 0; i < line.length; i += 4) {
    if (line[i] === '[' && line[i + 2] === ']')
      stacks[stackCounter - 1].unshift(line[i + 1]);
    stackCounter++;
  }
}

for (let command of commands) {
  let [qty, from, to] = command.match(/\d+/g).map((n) => Number(n));
  let items = stacks[from - 1].slice(-1 * qty);
  for (let i = 0; i < qty; i++) {
    stacks[from - 1].pop();
    stacks[to - 1].push(items[i]);
  }
}

for (let i = 0; i < stacks.length; i++) result += stacks[i].slice(-1);

export const b = result;
