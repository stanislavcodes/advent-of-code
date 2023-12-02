const input = await Deno.readTextFile('./day1/input.txt');
const lines = input.split('\n');

const digit_names = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
} as const;

let sum = 0;

for (const line of lines) {
  let digits = '';

  for (let i = 0; i < line.length; i++) {
    let current = line.slice(i);

    if (current[0].match(/\d/)) {
      digits += current[0];
      current = current.slice(1);

      continue;
    }

    const keys = Object.keys(digit_names) as Array<keyof typeof digit_names>;
    const valid_digit_name = keys.find((key) => current.startsWith(key));

    if (valid_digit_name) {
      digits += digit_names[valid_digit_name];
      current = current.slice(valid_digit_name.length);

      if (i + valid_digit_name.length < line.length) {
        i += valid_digit_name.length - 2;
      }
    }
  }

  if (digits.length === 0) {
    continue;
  }

  if (digits.length === 1) {
    sum += Number(digits.repeat(2));
    continue;
  }

  sum += parseInt(digits[0] + digits[digits.length - 1], 10);
}

console.log('What is the sum of all of the calibration values?', sum);
