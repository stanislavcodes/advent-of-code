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

const winShapes = new Map<string, string>([
  ['A', 'Y'],
  ['B', 'Z'],
  ['C', 'X'],
]);

const loseShapes = new Map<string, string>([
  ['A', 'Z'],
  ['B', 'X'],
  ['C', 'Y'],
]);

const drawShapes = new Map<string, string>([
  ['A', 'X'],
  ['B', 'Y'],
  ['C', 'Z'],
]);

const input = await Deno.readTextFile('./day2/input.txt');
const rounds = input.split('\n');
let score = 0;

for (const round of rounds) {
  const [opponent, end] = round.split(' ');
  let my = '';

  switch (end) {
    case 'X':
      my = loseShapes.get(opponent) ?? '';
      break;
    case 'Y':
      my = drawShapes.get(opponent) ?? '';
      break;
    case 'Z':
      my = winShapes.get(opponent) ?? '';
      break;
  }

  const shapeScore = shapes.get(my) ?? 0;
  const roundOutcome = results.get(`${opponent}${my}`) ?? 0;

  score += shapeScore + roundOutcome;
}

console.log('answer:', score);
