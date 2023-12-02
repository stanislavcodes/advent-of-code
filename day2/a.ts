const input = await Deno.readTextFile('./day2/input.txt');

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

function solve(
  input: string,
  limits: { red: number; green: number; blue: number }
) {
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    const game_id = line.split(': ')[0].replace('Game ', '');
    const game_sets = line.split(': ')[1].split(';');

    try {
      for (const game_set of game_sets) {
        const { red, green, blue } = game_set.split(',').reduce(
          (result, value_color_pair) => {
            const [value, color] = value_color_pair.trim().split(' ');
            if (color === 'red') result.red += Number(value);
            if (color === 'green') result.green += Number(value);
            if (color === 'blue') result.blue += Number(value);

            return result;
          },
          {
            red: 0,
            green: 0,
            blue: 0,
          }
        );

        if (red > limits.red || green > limits.green || blue > limits.blue) {
          throw new Error('Impossible game set');
        }
      }
    } catch (error) {
      if (error.message === 'Impossible game set') continue;
    }

    sum += Number(game_id);
  }

  return sum;
}

console.log('What is the sum of the IDs of those games?', solve(input, limits));
