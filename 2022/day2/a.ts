const results = new Map<string, number>([
  ['BZ', 6],
  ['CX', 6],
  ['AY', 6],
  ['AX', 3],
  ['BY', 3],
  ['CZ', 3],
  ['CY', 0],
  ['AZ', 0],
  ['BX', 0],
]);

const shapes = new Map<string, number>([
  ['X', 1],
  ['Y', 2],
  ['Z', 3],
]);

const input = await Deno.readTextFile('./day2/input.txt');
const rounds = input.split('\n');
let score = 0;

for (const round of rounds) {
  const [opponent, my] = round.split(' ');
  const shapeScore = shapes.get(my) ?? 0;
  const roundOutcome = results.get(`${opponent}${my}`) ?? 0;

  score += shapeScore + roundOutcome;
}

console.log('answer:', score);
