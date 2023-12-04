const input = await Deno.readTextFile('./day4/input.txt');

function solve(input: string) {
  let points = 0;

  const cards: Array<{
    numbers: Array<number>;
    winning_numbers: Array<number>;
  }> = input.split('\n').map((line) => {
    const [winning_numbers_string, numbers_string] = line.split(' | ');

    const winning_numbers = winning_numbers_string
      .replace(/Card\s+\d+:\s+/, '')
      .match(/\b\d+\b/g)
      ?.map(Number);
    const numbers = numbers_string.match(/\b\d+\b/g)?.map(Number);

    return {
      numbers: numbers || [],
      winning_numbers: winning_numbers || [],
    };
  });

  for (let i = 0; i < cards.length; i++) {
    const { numbers, winning_numbers } = cards[i];
    const common_numbers = winning_numbers.filter((n) => numbers.includes(n));

    if (common_numbers.length === 0) {
      continue;
    }

    let current_points = 1;

    for (let i = 1; i < common_numbers.length; i++) {
      current_points *= 2;
    }

    if (common_numbers.length > 0) {
      points += current_points;
    }
  }

  return points;
}

console.log('How many points are they worth in total?', solve(input));
