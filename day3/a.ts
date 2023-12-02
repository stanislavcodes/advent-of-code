const getPriority = (item: string) => {
  if (item === item.toUpperCase()) {
    return String(item).charCodeAt(0) - 65 + 27;
  }

  return String(item).charCodeAt(0) - 97 + 1;
};

const input = await Deno.readTextFile('./day3/input.txt');
let sum = 0;

for (const rucksack of input.split('\n')) {
  const first = rucksack.slice(0, rucksack.length / 2);
  const second = rucksack.slice(rucksack.length / 2);
  let common = '';

  for (const item of first) {
    if (second.includes(item)) {
      common += item;
      break;
    }
  }

  sum += getPriority(common);
}

console.log('answer: ', sum);
