import gsap from 'gsap';

export default function AnimateClouds(selector) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const flyCloud = (target, isInitial) => {
    const startX = isInitial ? gsap.utils.random(-200, w + 200) : w + 300;
    const endX = -500;

    const distance = startX - endX;

    const speed = gsap.utils.random(8, 45);
    const duration = distance / speed;

    gsap.fromTo(
      target,
      {
        x: startX,
        y: gsap.utils.random(-150, h * 0.7),
      },
      {
        x: endX,
        y: () => `+=${gsap.utils.random(-40, 40)}`,
        duration: duration,
        ease: 'none',

        delay: isInitial ? 0 : gsap.utils.random(0, 15),
        onComplete: () => flyCloud(target, false),
      },
    );
  };

  gsap.utils.toArray(selector).forEach((c) => flyCloud(c, true));
}
