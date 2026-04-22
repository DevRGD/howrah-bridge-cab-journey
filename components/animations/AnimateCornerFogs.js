import gsap from 'gsap';

export default function AnimateCornerFogs(targetClass) {
  gsap.utils.toArray(targetClass).forEach((corner) => {
    gsap.to(corner, {
      scale: () => gsap.utils.random(1.0, 1.4),
      opacity: () => gsap.utils.random(0.4, 0.9),
      x: () => gsap.utils.random(-30, 30),
      y: () => gsap.utils.random(-30, 30),
      duration: () => gsap.utils.random(8, 16),
      delay: () => gsap.utils.random(0, 5),
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  });
}
