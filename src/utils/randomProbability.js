export default function randomProbability() {
  var notRandomNumbers = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
  var idx = Math.floor(Math.random() * notRandomNumbers.length);
  return notRandomNumbers[idx];
}
