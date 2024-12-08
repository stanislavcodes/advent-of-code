const path = 'day8/input.txt';
const file = Bun.file(path);
const input = await file.text();
const map = input.split('\n').map((row) => row.split(''));

const antennaPositions = map
  .map((row, y) => {
    return row
      .map((cell, x) => {
        if (cell !== '.') {
          return { antenna: cell, x, y };
        }

        return null;
      })
      .filter((cell) => cell !== null);
  })
  .flat();

const distinctAntennas = new Set(
  antennaPositions.map((antenna) => antenna.antenna)
);

const antinodePositions = new Set<string>();

for (const antenna of Array.from(distinctAntennas)) {
  const antennaPairs = generatePairs<{
    x: number;
    y: number;
    antenna: string;
  }>(antennaPositions.filter((position) => position.antenna === antenna));

  if (antennaPairs.length === 1) {
    continue;
  }

  for (const antenna of antennaPairs) {
    const [first, second] = antenna;
    const dx = second.x - first.x;
    const dy = second.y - first.y;

    const antinodes = [
      [second.x + dx, second.y + dy],
      [first.x - dx, first.y - dy],
    ];

    for (const [x, y] of antinodes) {
      if (x >= 0 && x < map[0].length && y >= 0 && y < map.length) {
        antinodePositions.add(`${x},${y}`);
      }
    }
  }
}

function generatePairs<T>(elements: T[]): [T, T][] {
  const pairs: [T, T][] = [];

  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      pairs.push([elements[i], elements[j]]);
    }
  }

  return pairs;
}

console.log(
  'How many unique locations within the bounds of the map contain an antinode?',
  antinodePositions.size
);
