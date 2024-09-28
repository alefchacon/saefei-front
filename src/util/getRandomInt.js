export default function getRandomInt(min = 1, max = 5) {
  return Math.random() * (max - min) + min;
}