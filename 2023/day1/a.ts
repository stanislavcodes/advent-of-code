const input = await Deno.readTextFile('./day1/input.txt');
const lines = input.split('\n');
let sum = 0;

for (const line of lines) {
  const digits = line.replaceAll(/\D/g, '');

  if (digits.length === 0) {
    continue;
  }

  if (digits.length === 1) {
    sum += Number(digits.repeat(2));
    continue;
  }

  sum += Number(digits[0] + digits[digits.length - 1]);
}

console.log('What is the sum of all of the calibration values?', sum);
