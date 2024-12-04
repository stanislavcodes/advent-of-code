const path = 'day4/input.txt';
const file = Bun.file(path);
const input = await file.text();
const lines = input.split('\n');

let count = 0;
const xmasRegex = /XMAS/g;
const samxRegex = /SAMX/g;

const vertical = lines.reduce<Array<string>>((acc, line) => {
  line.split('').forEach((char, i) => {
    if (!acc[i]) {
      acc[i] = '';
    }

    acc[i] += char;
  });

  return acc;
}, []);

const n = lines.length;
const diagonals: Array<string> = [];

for (let d = 0; d < 2 * n - 1; d++) {
  let primaryDiagonal: string[] = [];
  let secondaryDiagonal: string[] = [];

  for (let i = 0; i < n; i++) {
    let jPrimary = d - i;
    let jSecondary = n - 1 - (d - i);

    // Check bounds for primary diagonal
    if (jPrimary >= 0 && jPrimary < n) {
      primaryDiagonal.push(lines[i][jPrimary]);
    }

    // Check bounds for secondary diagonal
    if (jSecondary >= 0 && jSecondary < n) {
      secondaryDiagonal.push(lines[i][jSecondary]);
    }
  }

  if (primaryDiagonal.length > 0) {
    diagonals.push(primaryDiagonal.join(''));
  }
  if (secondaryDiagonal.length > 0) {
    diagonals.push(secondaryDiagonal.join(''));
  }
}

const variants = [...lines, ...vertical, ...diagonals];

for (let i = 0; i < variants.length; i++) {
  const xmasMatches = variants[i].match(xmasRegex);
  const samxMatches = variants[i].match(samxRegex);

  if (xmasMatches !== null) {
    count += xmasMatches.length;
  }

  if (samxMatches !== null) {
    count += samxMatches.length;
  }
}

console.log('How many times does XMAS appear?', count);
