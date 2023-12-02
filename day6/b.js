import { readFileSync } from 'fs';

const input = readFileSync('day6/input.txt', 'utf8');
let [startOfMessageMarker, isStartOfMessageMarkerFound] = [0, false];

for (let start = 0, end = 14; end < input.length; end++, start++) {
  let [current, marker] = [input.slice(start, end), true];
  for (let char of current) {
    if (current.match(new RegExp(`${char}`, 'g')).length > 1) marker = false;
  }
  if (marker) {
    startOfMessageMarker = end;
    isStartOfMessageMarkerFound = true;
  }
  if (isStartOfMessageMarkerFound) break;
}

export const b = startOfMessageMarker;
