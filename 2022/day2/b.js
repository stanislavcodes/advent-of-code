import { readFileSync, appendFileSync } from 'fs';

const input = readFileSync('day2/input.txt', 'utf8').split('\n');
const rounds = input.map((line) => line.split(' '));
const scores = { A: 1, B: 2, C: 3 };
const winningPairs = { A: 'B', B: 'C', C: 'A' };
const losingPairs = { A: 'C', B: 'A', C: 'B' };

let totalScore = 0;

for (let round of rounds) {
  let [currentScore, shape, expected, myShape] = [0, round[0], round[1], ''];
  if (expected === 'X') {
    myShape = losingPairs[shape];
    currentScore += 0;
  } else if (expected === 'Y') {
    myShape = shape;
    currentScore += 3;
  } else if (expected === 'Z') {
    myShape = winningPairs[shape];
    currentScore += 6;
  }
  totalScore += currentScore + scores[myShape];
}

export const b = totalScore;

// x: lose, y: draw, z: win
// a: rock, b: paper, c: scissors
