export default function randomProbability() {
  const x = Math.floor(Math.random() * 2);
  const y = Math.floor(Math.random() * 2);
  return x === y;
}
