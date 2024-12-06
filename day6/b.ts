const path = 'day6/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n').map((line) => line.split(''));

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

function findStartingPosition(map: string[][]): {
  x: number;
  y: number;
  direction: (typeof directions)[number];
} {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const symbol = map[y][x];

      switch (symbol) {
        case directionGuardSymbol.up:
          return { x, y, direction: 'up' };
        case directionGuardSymbol.right:
          return { x, y, direction: 'right' };
        case directionGuardSymbol.down:
          return { x, y, direction: 'down' };
        case directionGuardSymbol.left:
          return { x, y, direction: 'left' };
      }
    }
  }

  return {
    x: -1,
    y: -1,
    direction: 'up',
  };
}

function traverseMap(data: string[][]) {
  const map = Array.from(data);
  const positions = new Set<string>();
  const maxX = map[0].length - 1;
  const maxY = map.length - 1;

  const states = new Set<string>(); // 'x,y,direction'

  const initial = findStartingPosition(map);

  let currentDirection: (typeof directions)[number] = initial.direction;
  let currentPosition: [number, number] = [initial.x, initial.y];

  positions.add(getPositionKey(initial.x, initial.y));

  while (true) {
    const currentState = [...currentPosition, currentDirection].join(',');

    if (states.has(currentState)) {
      return { positions: [], size: positions.size, loop: true };
    }

    states.add(currentState);

    const [newX, newY] = move(
      currentDirection,
      currentPosition[0],
      currentPosition[1]
    );
    const newPositionKey = getPositionKey(newX, newY);

    if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) {
      return {
        positions: Array.from(positions),
        size: positions.size,
        loop: false,
      };
    }

    const nextCharacter = map[newY][newX];

    if (nextCharacter === '#') {
      currentDirection = turnRight(currentDirection);
    } else {
      currentPosition[0] = newX;
      currentPosition[1] = newY;
      positions.add(newPositionKey);
    }
  }
}

const { positions } = traverseMap(lines);
let validObstructions = 0;

for (const position of positions) {
  const [x, y] = position.split(',').map(Number);
  const mapWithNewObstruction = Array.from(lines.map((row) => [...row]));

  mapWithNewObstruction[y][x] = '#';

  const { loop } = traverseMap(mapWithNewObstruction);

  if (loop) {
    validObstructions++;
  }
}

console.log(
  'How many different positions could you choose for this obstruction?',
  validObstructions
);
