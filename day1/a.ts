const path = 'day1/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n');

const [left, right] = lines
  .reduce(
    (acc, line) => {
      const [l, r] = line.split(' ').filter(Boolean).map(Number);

      acc[0].push(l);
      acc[1].push(r);

      return acc;
    },
    [[], []] as [number[], number[]]
  )
  .map((arr) => arr.sort());

let distanceBetweenLists = 0;

for (let i = 0; i < left.length; i++) {
  distanceBetweenLists += Math.abs(left[i] - right[i]);
}

console.log(
  'What is the total distance between your lists?',
  distanceBetweenLists
);
