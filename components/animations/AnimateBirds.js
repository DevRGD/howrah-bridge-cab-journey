import gsap from 'gsap';

export default function AnimateBirds(selector) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const getPointOnEdge = (edge) => {
    const offset = 200;
    switch (edge) {
      case 'top':
        return { x: gsap.utils.random(-offset, w + offset), y: -offset };
      case 'bottom':
        return { x: gsap.utils.random(-offset, w + offset), y: h + offset };
      case 'left':
        return { x: -offset, y: gsap.utils.random(-offset, h + offset) };
      case 'right':
        return { x: w + offset, y: gsap.utils.random(-offset, h + offset) };
      default:
        return { x: -offset, y: -offset };
    }
  };

  const flyFlock = (target, isInitial) => {
    const edges = ['top', 'bottom', 'left', 'right'];

    const startEdge = edges[Math.floor(Math.random() * edges.length)];
    const endEdges = edges.filter((e) => e !== startEdge);
    const endEdge = endEdges[Math.floor(Math.random() * endEdges.length)];

    const start = getPointOnEdge(startEdge);
    const end = getPointOnEdge(endEdge);

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = gsap.utils.random(40, 80);
    const duration = distance / speed;

    gsap.fromTo(
      target,
      {
        x: start.x,
        y: start.y,
        rotation: angle,
        scale: gsap.utils.random(0.3, 0.6),
      },
      {
        x: end.x,
        y: end.y,
        duration: duration,
        ease: 'none',
        delay: isInitial ? 0 : gsap.utils.random(0.5, 3.5),
        onComplete: () => flyFlock(target, false),
      },
    );
  };

  gsap.utils.toArray(selector).forEach((f) => flyFlock(f, true));
}
