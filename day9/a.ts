const path = 'day9/input.txt';
const file = Bun.file(path);
const input = await file.text().then((res) => res.split(''));

let currentId = 0;
let disk: Array<string> = [];
let freeSpaceSize = 0;

for (let i = 0; i < input.length; i++) {
  const isOdd = i % 2 === 1;

  for (let j = 0; j < Number(input[i]); j++) {
    disk.push(isOdd ? '.' : String(currentId));
  }

  if (!isOdd) {
    currentId++;
  } else {
    freeSpaceSize += Number(input[i]);
  }
}

for (let i = 0; i < disk.length - freeSpaceSize; i++) {
  const firstFreeSpaceIndex = disk.indexOf('.');
  const lastChar = disk.filter((r) => r !== '.').pop();

  if (firstFreeSpaceIndex === disk.length - freeSpaceSize) {
    break;
  }

  if (lastChar) {
    const lastCharIndex = disk.lastIndexOf(lastChar);

    disk[firstFreeSpaceIndex] = lastChar;
    disk[lastCharIndex] = '.';
  }
}

disk = disk.filter((r) => r !== '.');

let checksum = 0;

for (let i = 0; i < disk.length; i++) {
  checksum += Number(disk[i]) * i;
}

console.log('What is the resulting filesystem checksum?', checksum);
