import { readFileSync } from 'fs';

const input = readFileSync('day7/input.txt', 'utf8').split('\n');

class Dir {
  constructor() {
    this.parent;
    this.files = {};
    this.dirs = {};
  }
}

let fs = new Dir();
let current = fs;

for (const command of input) {
  const [cmd, ...rest] = command.split(' ');

  if (cmd === '$') {
    if (rest[0] === 'cd') {
      const dir = rest[1];
      if (dir === '..') {
        current = current.parent;
      } else if (dir === '/') {
        current = fs;
      } else {
        if (!current.dirs[dir]) {
          current.dirs[dir] = { parent: current, files: {}, dirs: {} };
        }
        current = current.dirs[dir];
      }
    } else if (rest[0] === 'ls') {
    }
  } else if (cmd !== 'dir') {
    current.files[rest[0]] = parseInt(cmd);
  }
}

const dirSizes = [];

const computeFileSize = (curr) => {
  let size = 0;

  for (const file in curr.files) {
    size += curr.files[file];
  }
  for (const dir in curr.dirs) {
    const dirSize = computeFileSize(curr.dirs[dir]);
    size += dirSize;
    dirSizes.push(dirSize);
  }
  return size;
};

computeFileSize(fs);

const totalSizes = dirSizes.filter((x) => x <= 100000).reduce((a, b) => a + b);

export const a = totalSizes;
