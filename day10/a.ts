const path = 'day10/input.txt';
const file = Bun.file(path);
const input = await file.text();
const map = input.split('\n').map((line) => line.split(''));

interface Coords {
  y: number;
  x: number;
}

const trailHeads = map
  .map((heights, y) => {
    return heights.map((height, x) => (Number(height) === 0 ? { x, y } : null));
  })
  .flat()
  .filter((step) => step !== null);

function traverseTrail(
  map: Array<Array<string>>,
  coords: Coords,
  path: Array<Coords>,
  paths: Array<Array<Coords>>,
  nineHeightCoordsSet: Set<string>
) {
  const current = Number(map[coords.y][coords.x]);
  const nextSteps = getValidNextDirections(map, coords);

  path.push(coords);

  if (current === 9 && !nextSteps.length) {
    nineHeightCoordsSet.add(`${coords.y},${coords.x}`);
    paths.push([...path]);
    return;
  }

  if (!nextSteps.length) {
    return;
  }

  for (let j = 0; j < nextSteps.length; j++) {
    traverseTrail(map, nextSteps[j], path, paths, nineHeightCoordsSet);
  }

  path.pop();
}

function getValidNextDirections(map: Array<Array<string>>, coords: Coords) {
  const currentHeight = Number(map[coords.y][coords.x]);

  const top =
    coords.y === 0
      ? null
      : {
          y: coords.y - 1,
          x: coords.x,
        };

  const bottom =
    coords.y === map.length - 1
      ? null
      : {
          y: coords.y + 1,
          x: coords.x,
        };

  const left =
    coords.x === 0
      ? null
      : {
          y: coords.y,
          x: coords.x - 1,
        };

  const right =
    coords.x === map[0].length - 1
      ? null
      : {
          y: coords.y,
          x: coords.x + 1,
        };

  return [top, right, bottom, left].filter(
    (coords) =>
      coords !== null && Number(map[coords.y][coords.x]) - currentHeight === 1
  ) as Array<Coords>;
}

const allPaths: Array<Array<Coords>> = [];

let sumOfTrailHeadScores = 0;

for (let i = 0; i < trailHeads.length; i++) {
  const trailHeadPaths: Array<Array<Coords>> = [];
  const trailHeadSet = new Set<string>();

  traverseTrail(map, trailHeads[i], [], trailHeadPaths, trailHeadSet);

  sumOfTrailHeadScores += trailHeadSet.size;
}

const fullPaths = allPaths.filter(
  (path) => path[path.length - 1].x === 0 && path[path.length - 1].y === 3
);

console.log(
  'What is the sum of the scores of all trailheads on your topographic map?',
  sumOfTrailHeadScores
);
