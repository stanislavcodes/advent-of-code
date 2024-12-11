const path = 'day11/input.txt';
const file = Bun.file(path);
const input = await file.text();

let stones = input.split(' ');
let blinks = 0;

while (blinks < 25) {
  const newStones: Array<string> = [];

  for (let i = 0; i < stones.length; i++) {
    const currentStone = stones[i];

    if (currentStone === '0') {
      newStones.push('1');
      continue;
    }

    if (currentStone.length % 2 === 0) {
      const leftStone = Number(currentStone.slice(0, currentStone.length / 2));
      const rightStone = Number(currentStone.slice(currentStone.length / 2));

      newStones.push(String(leftStone), String(rightStone));
      continue;
    }

    newStones.push(String(Number(currentStone) * 2024));
  }

  stones = newStones;
  blinks++;
}

console.log(
  'How many stones will you have after blinking 25 times?',
  stones.length
);
