const input = await Deno.readTextFile('./day1/input.txt');
const inventories = input.split('\n\n');
let mostCalories = 0;

for (const inventory of inventories) {
  const items = inventory.split('\n');

  const calories = items.reduce((sum, item) => sum + Number(item), 0);

  if (calories > mostCalories) {
    mostCalories = calories;
  }
}

console.log('answer: ', mostCalories);
