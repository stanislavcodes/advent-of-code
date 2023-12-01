const getPriority = (item: string) => {
  if (item === item.toUpperCase()) {
    return String(item).charCodeAt(0) - 65 + 27;
  }

  return String(item).charCodeAt(0) - 97 + 1;
};

function divideIntoGroups(initialArray: string[]): string[][] {
  const result: string[][] = [];

  for (let i = 0; i < initialArray.length; i += 3) {
    const items = initialArray.slice(i, i + 3);
    result.push(items);
  }
  return result;
}

const input = await Deno.readTextFile('./day3/input.txt');
const groups = divideIntoGroups(input.split('\n'));
let sum = 0;

for (const group of groups) {
  const [first, second, third] = group;
  let common = '';

  for (const item of first) {
    if (second.includes(item) && third.includes(item)) {
      common += item;
      break;
    }
  }

  sum += getPriority(common);
}

console.log('answer: ', sum);
