const path = 'day3/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n');
const regex = /mul\((\d{1,3},\d{1,3})\)|do\(\)|don't\(\)/g;

const matches = lines.reduce<Array<string>>((acc, line) => {
  const match = line.match(regex);

  if (match !== null) {
    acc.push(...match);
  }

  return acc;
}, []);

let enabled = true;
const multiplications = [];

for (let i = 0; i < matches.length; i++) {
  if (matches[i] === "don't()") {
    enabled = false;
    continue;
  }

  if (matches[i] === 'do()') {
    enabled = true;
    continue;
  }

  if (enabled) {
    multiplications.push(matches[i]);
  }
}

const sum = multiplications.reduce<number>((acc, mul) => {
  const [one, two] = mul.split(',').map((v) => v.replace(/\D/gi, ''));

  return (acc += Number(one) * Number(two));
}, 0);

console.log(
  'What do you get if you add up all of the results of just the enabled multiplications?',
  sum
);
