import fs from 'node:fs';
import readline from 'node:readline';

console.log('Hello via Bun!');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createFilesForDay = (day: number) => {
  const folder = `day${day}`;
  const files = ['a.ts', 'b.ts', 'input.txt'];

  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
      console.log(`Created folder: ${folder}`);
    }

    for (const file of files) {
      const filePath = `${folder}/${file}`;

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        console.log(`Created file: ${filePath}`);
      }
    }
  } catch (err) {
    console.error(`Error creating files for day ${day}:`, err);
  }
};

const askDay = () => {
  rl.question(
    'Enter the day number (1-25) to create files or "exit" to quit: ',
    (answer) => {
      if (answer.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        return;
      }

      const day = parseInt(answer, 10);

      if (day >= 1 && day <= 25) {
        createFilesForDay(day);
      } else {
        console.log(
          'Invalid day number. Please enter a number between 1 and 25.'
        );
      }

      // Ask again for the next day
      askDay();
    }
  );
};

console.log('Welcome to Advent of Code file setup!🎄');
askDay();
