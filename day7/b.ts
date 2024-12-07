const path = 'day7/input.txt';
const file = Bun.file(path);
const input = await file.text();

const operators = ['+', '*', '|'];

function generateOperatorVariants(
  symbols: string[],
  length: number
): string[][] {
  const results: string[][] = [];

  function backtrack(current: string[]): void {
    if (current.length === length) {
      results.push([...current]);
      return;
    }

    for (const symbol of symbols) {
      current.push(symbol);
      backtrack(current);
      current.pop();
    }
  }

  backtrack([]);
  return results;
}

const equations = input.split('\n').map((line) => {
  const [res, rest] = line.split(': ');
  const result = parseInt(res, 10);
  const numbers = rest.split(' ').map((n) => parseInt(n, 10));

  return {
    result,
    numbers,
  };
});

let totalCalibrationResult = 0;

for (const equation of equations) {
  const { result, numbers } = equation;

  const operatorVariants = generateOperatorVariants(
    operators,
    numbers.length - 1
  );

  for (const variant of operatorVariants) {
    let current = numbers[0];

    for (let i = 0; i < variant.length; i++) {
      const operator = variant[i];
      const number = numbers[i + 1];

      if (operator === '+') {
        current += number;
      } else if (operator === '*') {
        current *= number;
      } else if (operator === '|') {
        current = Number(String(current) + String(number));
      }
    }

    if (current === result) {
      totalCalibrationResult += result;
      break;
    }
  }
}

console.log('What is their total calibration result?', totalCalibrationResult);
