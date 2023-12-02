import { readFileSync } from 'fs';

const input = readFileSync('day6/input.txt', 'utf8');
let [startOfPacketMarker, isStartOfPacketMarkerFound] = [0, false];

for (let start = 0, end = 4; end < input.length; end++, start++) {
  let [current, marker] = [input.slice(start, end), true];
  for (let char of current) {
    if (current.match(new RegExp(`${char}`, 'g')).length > 1) marker = false;
  }
  if (marker) {
    startOfPacketMarker = end;
    isStartOfPacketMarkerFound = true;
  }
  if (isStartOfPacketMarkerFound) break;
}

export const a = startOfPacketMarker;
