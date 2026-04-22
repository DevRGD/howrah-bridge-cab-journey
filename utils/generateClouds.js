export default function generateClouds() {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    id: i,
    opacity: Math.random() * 0.4 + 0.3,
    flip: Math.random() > 0.5 ? 1 : -1,
    scale: Math.random() * 0.8 + 0.4,
    breathDelay: Math.random() * -10,
  }));
}
