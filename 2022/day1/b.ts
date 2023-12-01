const input = await Deno.readTextFile('./day1/input.txt');
const inventories = input.split('\n\n');
const calories = [];

for (const inventory of inventories) {
  const items = inventory.split('\n');
  const inventoryCalories = items.reduce((sum, item) => sum + Number(item), 0);

  if (calories.length === 0) {
    calories.push(inventoryCalories);
    continue;
  }

  if (inventoryCalories > calories[0]) {
    calories.unshift(inventoryCalories);
    continue;
  }

  if (calories[0] > inventoryCalories && calories[1] < inventoryCalories) {
    calories.splice(1, 0, inventoryCalories);
    continue;
  }

  calories.push(inventoryCalories);
}

const answer = calories.slice(0, 3).reduce((sum, item) => sum + item, 0);

console.log('answer: ', answer);
