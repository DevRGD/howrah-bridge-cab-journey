import gsap from 'gsap';

export default function AnimateMist(selector) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const flowMist = (target) => {
    gsap.fromTo(
      target,
      { x: w + 200, y: gsap.utils.random(h * 0.2, h), opacity: 0 },
      {
        x: -800,
        y: '-=100',
        opacity: gsap.utils.random(0.2, 0.5),
        duration: gsap.utils.random(40, 80),
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 15),
        onComplete: () => flowMist(target),
      },
    );
  };

  gsap.utils.toArray(selector).forEach((m) => flowMist(m));
}
