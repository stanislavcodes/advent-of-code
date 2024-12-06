const path = 'day6/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n').map((line) => line.split(''));

const maxX = lines[0].length - 1;
const maxY = lines.length - 1;

const directions = ['up', 'right', 'down', 'left'] as const;

const directionGuardSymbol = {
  up: '^',
  right: '>',
  down: 'v',
  left: '<',
} as const;

function getPositionKey(x: number, y: number) {
  return `${x},${y}`;
}

function move(
  direction: (typeof directions)[number],
  x: number,
  y: number
): [number, number] {
  let newX = x;
  let newY = y;

  switch (direction) {
    case 'up':
      newY--;
      break;
    case 'right':
      newX++;
      break;
    case 'down':
      newY++;
      break;
    case 'left':
      newX--;
      break;
  }

  return [newX, newY];
}

function turnRight(direction: (typeof directions)[number]) {
  const currentIndex = directions.indexOf(direction);
  const nextIndex = currentIndex + 1;

  return directions[nextIndex % directions.length];
}

const positions = new Set<string>();

let currentDirection: (typeof directions)[number] | null = null;
let currentPosition: [number, number] | null = null;
let nextPosition: [number, number] | null = null;

// find starting position
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const direction = directions
    .filter((direction) => {
      return line.indexOf(directionGuardSymbol[direction]) !== -1;
    })
    .pop();

  if (direction) {
    const x = line.indexOf(directionGuardSymbol[direction]);
    const y = i;

    currentPosition = [x, y];
    nextPosition = move(direction, x, y);
    positions.add(getPositionKey(x, y));
    currentDirection = direction;
  }
}

if (!currentPosition) {
  throw new Error('Starting position not found');
}

if (!currentDirection) {
  throw new Error('Current direction not found');
}

if (!nextPosition) {
  throw new Error('Next position not found');
}

let x = currentPosition[0];
let y = currentPosition[1];

while (true) {
  const [newX, newY] = move(currentDirection, x, y);
  const newPositionKey = getPositionKey(newX, newY);

  if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) {
    break;
  }

  const nextCharacter = lines[newY][newX];

  if (nextCharacter === '#') {
    if (currentDirection !== null) {
      currentDirection = turnRight(currentDirection);
    }
  } else {
    x = newX;
    y = newY;
    positions.add(newPositionKey);
  }
}

console.log(
  'How many distinct positions will the guard visit before leaving the mapped area?',
  positions.size
);
