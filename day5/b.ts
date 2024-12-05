const path = 'day5/input.txt';
const file = Bun.file(path);
const input = await file.text();

const parsed = input.split('\n\n').map((lines) => lines.split('\n'));

function isValidSorting(
  numbers: number[],
  constraints: [number, number][]
): boolean {
  // check only the numbers that have constraints
  for (const [a, b] of constraints) {
    // find indices of a and b in the current array
    const indexA = numbers.indexOf(a);
    const indexB = numbers.indexOf(b);

    // if a appears after b, the constraint is violated
    if (indexA > indexB) {
      return false;
    }
  }

  return true;
}

const rules = parsed[0].map((line) => {
  const [one, two] = line.split('|').map(Number);

  return [one, two] as [number, number];
});

const updates = parsed[1].map((line) => line.split(',').map(Number));

const invalid = updates.filter(
  (update) =>
    !isValidSorting(
      update,
      rules.filter(([a, b]) => update.includes(a) && update.includes(b))
    )
);

const valid = invalid.map((update) => {
  const constraints = rules.filter(
    ([a, b]) => update.includes(a) && update.includes(b)
  );

  const sorted = [...update];
  let changed;

  do {
    changed = false; // flag to track if any swaps occur in this iteration
    for (const [a, b] of constraints) {
      const indexA = sorted.indexOf(a);
      const indexB = sorted.indexOf(b);

      // if the constraint is violated, swap and mark as changed
      if (indexA > indexB) {
        [sorted[indexA], sorted[indexB]] = [sorted[indexB], sorted[indexA]];
        changed = true;
      }
    }
  } while (changed); // repeat until no swaps occur

  return sorted;
});

const sum = valid.reduce((acc, curr) => {
  const middle = curr[Math.floor(curr.length / 2)];

  return acc + middle;
}, 0);

console.log(
  'What do you get if you add up the middle page number from those correctly-ordered updates?',
  sum
);
