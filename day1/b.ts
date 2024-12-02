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

let similarityScore = 0;

for (let i = 0; i < left.length; i++) {
  similarityScore += right.filter((r) => r === left[i]).length * left[i];
}

console.log('What is their similarity score?', similarityScore);
