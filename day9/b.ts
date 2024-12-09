const path = 'day9/input.txt';
const file = Bun.file(path);
const input = await file.text();

function mySolutionThatOnlyWorksWithExampleInput(input: string): number {
  let currentId = 0;
  let disk: Array<string> = [];
  let blocks: Array<string> = [];
  let freeSpaceSize = 0;

  for (let i = 0; i < input.length; i++) {
    const isOdd = i % 2 === 1;
    let block = '';

    for (let j = 0; j < Number(input[i]); j++) {
      if (!isOdd) {
        disk.push(String(currentId));
        block += String(currentId);
      } else {
        disk.push('.');
      }
    }

    if (!isOdd) {
      currentId++;
      blocks.unshift(block);
    } else {
      freeSpaceSize += Number(input[i]);
    }
  }

  for (let i = 0; i < blocks.length; i++) {
    const diskString = disk.join('');
    const blockStartIndex = diskString.indexOf(blocks[i]);
    const availableSpace = diskString.match(/\.+/g);

    if (availableSpace) {
      const suitableSpace = availableSpace.filter(
        (r) => r.length >= blocks[i].length
      );

      if (suitableSpace.length) {
        const suitableSpaceIndex = diskString.indexOf(suitableSpace[0]);
        if (suitableSpaceIndex < blockStartIndex) {
          disk.splice(
            blockStartIndex,
            blocks[i].length,
            ...'.'.repeat(blocks[i].length)
          );

          disk.splice(suitableSpaceIndex, blocks[i].length, ...blocks[i]);
        }
      }
    }
  }

  let checksum = 0;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== '.') {
      checksum += Number(disk[i]) * i;
    }
  }

  return checksum;
}

function workingSolution(input: string): number {
  // Parse the input into block sizes
  const sizes = input.split('').map(Number);

  // Track files and free spaces
  const files: Array<{ id: number; length: number }> = [];
  const freeSpaces: Array<number> = [];

  // First pass: identify files and free spaces
  let currentId = 0;
  let blocks: Array<string> = [];
  for (let i = 0; i < sizes.length; i += 2) {
    const fileLength = sizes[i];
    const freeSpaceLength = sizes[i + 1] || 0;

    files.push({ id: currentId, length: fileLength });
    freeSpaces.push(freeSpaceLength);
    blocks.unshift(String(currentId));

    currentId++;
  }

  // Sort files by ID in descending order
  files.sort((a, b) => b.id - a.id);

  // Disk representation
  const disk: string[] = [];

  // Initial disk population
  currentId = 0;
  for (let i = 0; i < sizes.length; i += 2) {
    const fileLength = sizes[i];
    const freeSpaceLength = sizes[i + 1] || 0;

    // Add file blocks
    for (let j = 0; j < fileLength; j++) {
      disk.push(String(currentId));
    }

    // Add free space blocks
    for (let j = 0; j < freeSpaceLength; j++) {
      disk.push('.');
    }

    currentId++;
  }

  // Move files according to the new rules
  for (const file of files) {
    const fileBlocks = disk.filter((b) => b === String(file.id));
    const currentFileIndex = disk.indexOf(String(file.id));

    // Look for suitable free space to the left
    let bestMoveIndex = -1;
    for (let i = 0; i < currentFileIndex; i++) {
      const potentialMoveSpan = disk.slice(i, i + file.length);
      if (potentialMoveSpan.every((b) => b === '.')) {
        bestMoveIndex = i;
        break;
      }
    }

    // Move the file if a suitable space is found
    if (bestMoveIndex !== -1) {
      // Remove file from current location
      for (let i = 0; i < file.length; i++) {
        const index = disk.indexOf(String(file.id));
        disk[index] = '.';
      }

      // Place file in new location
      for (let i = 0; i < file.length; i++) {
        disk[bestMoveIndex + i] = String(file.id);
      }
    }
  }

  // Calculate checksum
  let checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== '.') {
      checksum += Number(disk[i]) * i;
    }
  }

  return checksum;
}

const checksum = workingSolution(input);

console.log('What is the resulting filesystem checksum?', checksum);
