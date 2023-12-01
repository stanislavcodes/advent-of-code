import { readFileSync, appendFileSync } from 'fs';

const input = readFileSync('day2/input.txt', 'utf8').split('\n');
const rounds = input.map((line) => line.split(' '));
const scores = { X: 1, Y: 2, Z: 3 };

let totalScore = 0;

for (let round of rounds) {
  let [currentScore, shape, myShape] = [0, round[0], round[1]];
  if (shape === 'A' && myShape === 'X') currentScore += 3; // Rock      vs  Rock
  if (shape === 'B' && myShape === 'Y') currentScore += 3; // Paper     vs  Paper
  if (shape === 'C' && myShape === 'Z') currentScore += 3; // Scissors  vs  Scissors
  if (shape === 'A' && myShape === 'Y') currentScore += 6; // Rock      vs  Paper
  if (shape === 'B' && myShape === 'Z') currentScore += 6; // Paper     vs  Scissors
  if (shape === 'C' && myShape === 'X') currentScore += 6; // Scissors  vs  Rock
  totalScore += currentScore + scores[myShape];
}

export const a = totalScore;
