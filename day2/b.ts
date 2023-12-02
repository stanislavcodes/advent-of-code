const input = await Deno.readTextFile('./day2/input.txt');

function solve(input: string) {
  const games = input.split('\n');
  let result = 0;

  for (const game of games) {
    const sets = game
      .split(': ')[1]
      .split(';')
      .map((set) =>
        set.split(',').reduce(
          (result, current) => {
            const [value, color] = current.trim().split(' ');
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
        )
      );

    const max_values = sets.reduce(
      (result, set) => {
        if (set.red > result.red) result.red = set.red;
        if (set.green > result.green) result.green = set.green;
        if (set.blue > result.blue) result.blue = set.blue;

        return result;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );

    result += max_values.red * max_values.green * max_values.blue;
  }

  return result;
}

console.log('What is the sum of the IDs of those games?', solve(input));
