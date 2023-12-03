const input = await Deno.readTextFile('./day3/input.txt');

function is_symbol(symbol: string) {
  const match = symbol.match(/[^a-zA-Z0-9.]+/g);

  if (!match) return false;

  return true;
}

function solve(input: string) {
  const lines = input.split('\n');

  let sum = 0;

  const lines_numbers_with_indexes: Array<
    Array<{
      [key: string]: [number, number];
    }>
  > = [];

  for (let i = 0; i < lines.length; i++) {
    const numbers: Array<{
      [key: string]: [number, number];
    }> = [];

    let start_index = 0;
    let end_index = 0;
    let current_digits = '';

    for (let j = 0; j < lines[i].length; j++) {
      const is_digit = lines[i][j].match(/\d/g);

      if (is_digit) {
        if (!current_digits) start_index = j;

        current_digits += lines[i][j];

        if (j === lines[i].length - 1) {
          end_index = j;
          numbers.push({
            [current_digits]: [start_index, end_index],
          });
          current_digits = '';
        }
      } else {
        if (current_digits) {
          end_index = j - 1;
          numbers.push({
            [current_digits]: [start_index, end_index],
          });
          current_digits = '';
        }
      }
    }

    lines_numbers_with_indexes.push(numbers);
  }

  for (let i = 0; i < lines_numbers_with_indexes.length; i++) {
    const current_numbers = lines_numbers_with_indexes[i];

    if (Object.keys(current_numbers).length === 0) continue;

    for (const num_obj of current_numbers) {
      const [num, value] = Object.entries(num_obj)[0];
      const [start_index, end_index] = value;

      const adjacent_chars = [];
      const has_char_before = start_index > 0;
      const has_char_after = end_index < lines[i].length - 1;

      if (has_char_before) {
        adjacent_chars.push(lines[i][start_index - 1]);

        if (i > 0) {
          adjacent_chars.push(lines[i - 1][start_index - 1]);
        }

        if (i < lines.length - 1) {
          adjacent_chars.push(lines[i + 1][start_index - 1]);
        }
      }

      if (has_char_after) {
        adjacent_chars.push(lines[i][end_index + 1]);

        if (i > 0) {
          adjacent_chars.push(lines[i - 1][end_index + 1]);
        }

        if (i < lines.length - 1) {
          adjacent_chars.push(lines[i + 1][end_index + 1]);
        }
      }

      if (i > 0) {
        adjacent_chars.push(lines[i - 1].slice(start_index, end_index + 1));
      }

      if (i < lines.length - 1) {
        adjacent_chars.push(lines[i + 1].slice(start_index, end_index + 1));
      }

      if (is_symbol(adjacent_chars.join(''))) {
        sum += Number(num);
      }
    }
  }

  return sum;
}

console.log(
  'What is the sum of all of the part numbers in the engine schematic?',
  solve(input)
);
