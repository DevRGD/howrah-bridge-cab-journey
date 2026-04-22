export default function generateFlocks() {
  return [1, 2, 3].map((flockIndex) => {
    const size = Math.floor(Math.random() * 7) + 1;
    const birds = [];

    for (let i = 0; i < size; i++) {
      const row = Math.floor((i + 1) / 2);
      const side = i % 2 === 0 ? 1 : -1;

      const baseX = i === 0 ? 0 : side * row * 30;
      const baseY = i === 0 ? 0 : row * 30;

      const jitterX = i === 0 ? 0 : Math.random() * 20 - 10;
      const jitterY = i === 0 ? 0 : Math.random() * 20 - 10;

      birds.push({
        offsetX: baseX + jitterX,
        offsetY: baseY + jitterY,
        flapDelay: Math.random() * -1.5,
      });
    }
    return { id: flockIndex, birds };
  });
}
