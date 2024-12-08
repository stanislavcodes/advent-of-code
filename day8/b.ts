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
    antinodePositions.add(`${first.x},${first.y}`);
    antinodePositions.add(`${second.x},${second.y}`);

    const dx = second.x - first.x;
    const dy = second.y - first.y;
    let antinode1 = [second.x + dx, second.y + dy];
    let antinode2 = [first.x - dx, first.y - dy];

    while (true) {
      if (
        antinode1[0] >= 0 &&
        antinode1[0] < map[0].length &&
        antinode1[1] >= 0 &&
        antinode1[1] < map.length
      ) {
        antinodePositions.add(`${antinode1[0]},${antinode1[1]}`);

        antinode1 = [antinode1[0] + dx, antinode1[1] + dy];
      } else {
        break;
      }
    }

    while (true) {
      if (
        antinode2[0] >= 0 &&
        antinode2[0] < map[0].length &&
        antinode2[1] >= 0 &&
        antinode2[1] < map.length
      ) {
        antinodePositions.add(`${antinode2[0]},${antinode2[1]}`);

        antinode2 = [antinode2[0] - dx, antinode2[1] - dy];
      } else {
        break;
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
