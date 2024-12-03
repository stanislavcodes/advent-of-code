const path = 'day3/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n');
const regex = /mul\((\d{1,3},\d{1,3})\)/g;

const matches = lines.reduce<Array<string>>((acc, line) => {
  const match = line.match(regex);

  if (match !== null) {
    acc.push(...match);
  }

  return acc;
}, []);

const sum = matches.flat().reduce<number>((acc, mul) => {
  const [one, two] = mul.split(',').map((v) => v.replace(/\D/gi, ''));

  return (acc += Number(one) * Number(two));
}, 0);

console.log(
  'What do you get if you add up all of the results of the multiplications?',
  sum
);
